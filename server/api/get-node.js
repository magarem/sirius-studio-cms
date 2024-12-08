import { readFile } from 'fs/promises';
import path from 'path';

export default defineEventHandler(async (event) => {
  // Extrai o `_path` da query string (exemplo: /api/get-node?_path=/inicio)
  const { _path } = getQuery(event);

  if (!_path) {
    return { error: "O parâmetro `_path` é necessário." };
  }

  // Caminho para o arquivo JSON
  const filePath = path.resolve('server/data/nodes.json');

  try {
    // Carrega e parseia o conteúdo do arquivo JSON
    const fileContent = await readFile(filePath, 'utf8');
    const nodes = JSON.parse(fileContent);
    console.log(nodes)
    // Função recursiva para buscar o nó pelo campo `_path`
    function findNodeByPath(nodes, path) {
      for (const node of nodes) {
        if (node._path === path) {
          return node; // Retorna o nó se o `_path` corresponde
        }
        // Se houver filhos, faz a busca recursiva neles
        if (node.children && node.children.length > 0) {
          const found = findNodeByPath(node.children, path);
          if (found) return found; // Retorna o nó encontrado nos filhos
        }
      }
      return null; // Retorna null se não encontrar
    }

    // Busca o nó pelo `_path` fornecido
    const node = findNodeByPath(nodes, _path);

    // Verifica se o nó foi encontrado
    if (!node) {
      return { error: `Nó com _path "${_path}" não encontrado.` };
    }

    // Retorna o nó encontrado
    return node;
  } catch (error) {
    console.error("Erro ao ler o arquivo JSON:", error);
    return { error: "Erro ao acessar os dados." };
  }
});
