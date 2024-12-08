import { defineEventHandler, getQuery } from 'file:///home/maga/dev/sirius5/node_modules/h3/dist/index.mjs';
import { readFile } from 'fs/promises';
import path from 'path';

const getNode = defineEventHandler(async (event) => {
  const { _path } = getQuery(event);
  if (!_path) {
    return { error: "O par\xE2metro `_path` \xE9 necess\xE1rio." };
  }
  const filePath = path.resolve("server/data/nodes.json");
  try {
    let findNodeByPath = function(nodes2, path2) {
      for (const node2 of nodes2) {
        if (node2._path === path2) {
          return node2;
        }
        if (node2.children && node2.children.length > 0) {
          const found = findNodeByPath(node2.children, path2);
          if (found) return found;
        }
      }
      return null;
    };
    const fileContent = await readFile(filePath, "utf8");
    const nodes = JSON.parse(fileContent);
    console.log(nodes);
    const node = findNodeByPath(nodes, _path);
    if (!node) {
      return { error: `N\xF3 com _path "${_path}" n\xE3o encontrado.` };
    }
    return node;
  } catch (error) {
    console.error("Erro ao ler o arquivo JSON:", error);
    return { error: "Erro ao acessar os dados." };
  }
});

export { getNode as default };
//# sourceMappingURL=get-node.mjs.map
