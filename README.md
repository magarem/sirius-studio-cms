# Sirius Studio

Sirius Studio é um CMS (Content Management System) moderno, desenvolvido com **Nuxt3**, projetado para gerenciar conteúdo utilizando **SQLite** e gerar páginas **HTML estáticas**. Ele oferece um fluxo eficiente de edição e publicação, permitindo a execução simultânea do ambiente de edição e da versão final gerada.

---

## Recursos Principais

- **Baseado em Nuxt3**: Aproveita a flexibilidade e o desempenho do Nuxt3/Content.
- **SQLite para Gerenciamento de Conteúdo**: Simples de configurar, permitindo que o conteúdo seja gerenciado com eficiência.
- **Geração de Páginas Estáticas**: Converte o conteúdo em um site rápido e seguro com páginas HTML estáticas (npm run generate)
- **Execução Lado a Lado**: Rode o ambiente de edição (`npm run build`) e visualize o site compilado (`npm run generate`) ao mesmo tempo.

---

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados em seu ambiente:

- Node.js (v16 ou superior)
- NPM (ou Yarn)
- SQLite

---

## Como Usar

1. Inicie um novo projeto com o comando:
   npm run init

2. Para inciar a edição do seu site:
   npm run build && npm run admin

   Depois de editar clique no botão "publicar site"

3. Para ver o site publicado:
   npm run site

4. Clone este repositório:
   ```bash
   git clone git@github.com:magarem/sirius-studio-cms.git
   cd sirius-studio-cms
