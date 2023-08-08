# NASA Image and Video Library

## Função fetchMediaFromNASA(searchQuery)

Esta função é responsável por buscar dados da API da NASA com base na consulta de pesquisa fornecida e exibir imagens ou vídeos na página. A consulta de pesquisa é passada como parâmetro `searchQuery`.

**Parâmetros:**
- `searchQuery` (string): A consulta de pesquisa para buscar imagens ou vídeos relacionados à NASA.

**Retorno:**
- Nenhum.

**Exemplo de Uso:**
```javascript
fetchMediaFromNASA("moon");
```

## Função isValidData(data)

Esta função verifica se os dados recebidos da API da NASA são válidos. Ela é usada internamente na função `fetchMediaFromNASA`.

**Parâmetros:**
- `data` (object): Os dados recebidos da API da NASA.

**Retorno:**
- `true` se os dados são válidos e contêm resultados;
- `false` caso contrário.

## Função getMediaUrl(mediaData, mediaType)

Esta função é usada internamente para obter o URL correto da mídia (imagem ou vídeo) com base no tipo de mídia e nos dados da API recebidos.

**Parâmetros:**
- `mediaData` (array): Os dados da API da NASA contendo URLs da mídia.
- `mediaType` (string): O tipo de mídia ("image" para imagem ou "video" para vídeo).

**Retorno:**
- O URL correto da mídia (imagem ou vídeo) ou `undefined` se não for encontrado.

## Função findImageMediaUrl(mediaData)

Esta função é usada internamente para encontrar o URL correto de uma imagem na lista de URLs da API da NASA, descartando arquivos TIF e buscando arquivos JPG ou PNG.

**Parâmetros:**
- `mediaData` (array): Os dados da API da NASA contendo URLs da mídia.

**Retorno:**
- O URL correto da imagem ou `undefined` se não for encontrado.

## Função findVideoMediaUrl(mediaData)

Esta função é usada internamente para encontrar o URL correto de um vídeo na lista de URLs da API da NASA, buscando arquivos MP4.

**Parâmetros:**
- `mediaData` (array): Os dados da API da NASA contendo URLs da mídia.

**Retorno:**
- O URL correto do vídeo ou `undefined` se não for encontrado.

## Função createAlbumContainer(mediaType, mediaUrl, description, title)

Esta função é usada para criar o elemento de álbum (imagem ou vídeo) e adicioná-lo ao container `imagesContainer`.

**Parâmetros:**
- `mediaType` (string): O tipo de mídia ("image" para imagem ou "video" para vídeo).
- `mediaUrl` (string): O URL correto da mídia (imagem ou vídeo).
- `description` (string): A descrição da mídia.
- `title` (string): O título da mídia.

**Retorno:**
- O elemento de álbum (div) criado.

## Função createImageElement(mediaUrl, description)

Esta função é usada para criar o elemento de imagem e adicionar um evento de clique para abrir o modal com a imagem completa e a descrição.

**Parâmetros:**
- `mediaUrl` (string): O URL correto da imagem.
- `description` (string): A descrição da imagem.

**Retorno:**
- O elemento de imagem (img) criado.

## Função createVideoElement(mediaUrl)

Esta função é usada para criar o elemento de vídeo.

**Parâmetros:**
- `mediaUrl` (string): O URL correto do vídeo.

**Retorno:**
- O elemento de vídeo (video) criado.

## Função handleSearch()

Esta função é responsável por lidar com o evento de clique no botão de busca. Ela obtém a consulta de pesquisa do campo de entrada, limpa espaços em branco e chama a função `fetchMediaFromNASA` para buscar e exibir as mídias correspondentes.

**Parâmetros:**
- Nenhum.

**Retorno:**
- Nenhum.

## Função openModal(mediaUrl, description)

Esta função é responsável por abrir o modal com a imagem completa e a descrição.

**Parâmetros:**
- `mediaUrl` (string): O URL da mídia (imagem ou vídeo) que será exibido no modal.
- `description` (string): A descrição da mídia que será exibida no modal.

**Retorno:**
- Nenhum.

## Função closeModal()

Esta função é responsável por fechar o modal.

**Parâmetros:**
- Nenhum.

**Retorno:**
- Nenhum.

**Exemplo de Uso (HTML):**
```html
<button id="search-button">Buscar</button>
<input type="text" id="search-input">
<div id="images-container"></div>
<div id="modal-container">
  <img id="modal-image">
  <p id="modal-description"></p>
  <button onclick="closeModal()">Fechar</button>
</div>
```

**Observação:** A função `handleSearch` é atribuída ao evento de clique no botão de busca com a seguinte linha de código em JavaScript:

```javascript
document.getElementById("search-button").addEventListener("click", handleSearch);
```

Isso significa que quando o botão de busca é clicado, a função `handleSearch` é chamada para buscar e exibir as mídias relacionadas à consulta de pesquisa fornecida. O campo de entrada com o id "search-input" é usado para obter a consulta de pesquisa. As mídias são exibidas no container com o id "images-container". O modal para exibir a imagem completa e a descrição é manipulado pelas funções `openModal` e `closeModal`.
```
