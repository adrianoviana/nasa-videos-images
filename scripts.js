// Função para buscar dados da API e exibir imagens ou vídeos com base na busca
async function fetchMediaFromNASA(searchQuery) {
  try {
    // Constrói a URL da API da NASA com base na consulta de pesquisa
    const apiUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(searchQuery)}`;
    
    // Faz uma requisição GET à API da NASA para obter os dados da busca
    const response = await fetch(apiUrl);
    const data = await response.json(); // Converte a resposta para JSON

    const imagesContainer = document.getElementById("images-container");
    imagesContainer.innerHTML = ""; // Limpar resultados anteriores

    // Verifica se os dados recebidos da API são válidos (contêm resultados)
    if (!isValidData(data)) {
      console.error("Nenhum resultado encontrado para a busca.");
      return;
    }

    // Itera sobre cada item da coleção de resultados da API
    for (const item of data.collection.items) {
      const mediaType = item.data[0].media_type;
      
      // Faz uma nova requisição GET ao link do recurso (imagem ou vídeo)
      const mediaData = await fetch(item.href).then(response => response.json());
      
      // Obtém o URL correto da mídia (imagem ou vídeo) com base no tipo de mídia
      const mediaUrl = getMediaUrl(mediaData, mediaType);
      const description = item.data[0].description;
      const title = item.data[0].title;

      // Cria o elemento de álbum (imagem ou vídeo) e adiciona-o ao container
      const albumContainer = createAlbumContainer(mediaType, mediaUrl, description, title);
      imagesContainer.appendChild(albumContainer);
    }
  } catch (error) {
    console.error("Erro ao buscar dados na API:", error);
  }
}

// Função para verificar se os dados da API são válidos
function isValidData(data) {
  return data && data.collection && data.collection.items && data.collection.items.length > 0;
}

// Função para encontrar o URL correto da mídia (imagem ou vídeo)
function getMediaUrl(mediaData, mediaType) {
  if (mediaType === "image") {
    return findImageMediaUrl(mediaData); // Encontra o URL correto da imagem (descartando .tif e buscando .jpg ou .png)
  } else if (mediaType === "video") {
    return findVideoMediaUrl(mediaData); // Encontra o URL correto do vídeo (buscando .mp4)
  }
}

// Função para encontrar o URL da imagem apropriada (descartar .tif e buscar .jpg ou .png)
function findImageMediaUrl(mediaData) {
  for (const mediaUrl of mediaData) {
    if (mediaUrl.endsWith(".jpg") || mediaUrl.endsWith(".png")) {
      return mediaUrl;
    }
  }
}

// Função para encontrar o URL do vídeo (buscar .mp4)
function findVideoMediaUrl(mediaData) {
  for (const mediaUrl of mediaData) {
    if (mediaUrl.endsWith(".mp4")) {
      return mediaUrl;
    }
  }
}

// Função para criar o elemento de álbum (imagem ou vídeo) e adicioná-lo ao container
function createAlbumContainer(mediaType, mediaUrl, description, title) {
  const albumContainer = document.createElement("div");
  albumContainer.classList.add("album");

  if (mediaType === "image") {
    // Cria o elemento de imagem e adiciona evento de clique para abrir o modal
    const imageElement = createImageElement(mediaUrl, description);
    albumContainer.appendChild(imageElement);
  } else if (mediaType === "video") {
    // Cria o elemento de vídeo
    const videoElement = createVideoElement(mediaUrl);
    albumContainer.appendChild(videoElement);
  }

  // Adiciona o título como um cabeçalho abaixo da imagem ou vídeo
  const titleElement = document.createElement("h2");
  titleElement.textContent = title;
  albumContainer.appendChild(titleElement);

  return albumContainer;
}

// Função para criar o elemento de imagem e adicionar evento de clique para abrir o modal
function createImageElement(mediaUrl, description) {
  const imageElement = document.createElement("img");
  imageElement.src = mediaUrl;
  imageElement.alt = description;
  imageElement.addEventListener("click", () => openModal(mediaUrl, description));
  return imageElement;
}

// Função para criar o elemento de vídeo
function createVideoElement(mediaUrl) {
  const videoElement = document.createElement("video");
  videoElement.controls = true;
  const sourceElement = document.createElement("source");
  sourceElement.src = mediaUrl;
  sourceElement.type = "video/mp4";
  videoElement.appendChild(sourceElement);
  return videoElement;
}

// Função para lidar com o evento de clique no botão de busca
function handleSearch() {
  const searchInput = document.getElementById("search-input");
  const searchQuery = searchInput.value.trim();

  if (searchQuery !== "") {
    fetchMediaFromNASA(searchQuery);
  }
}

// Adicionar o ouvinte de evento ao botão de busca
document.getElementById("search-button").addEventListener("click", handleSearch);

// Função para abrir o modal com a imagem completa e a descrição
function openModal(mediaUrl, description) {
  const modalContainer = document.getElementById("modal-container");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");

  modalImage.src = mediaUrl;
  modalDescription.textContent = description; // Exibir a descrição no modal
  modalContainer.style.display = "flex";
}

// Função para fechar o modal
function closeModal() {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.style.display = "none";
}
