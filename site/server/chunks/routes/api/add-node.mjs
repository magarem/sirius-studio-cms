import { defineEventHandler, readBody } from 'file:///home/maga/dev/sirius5/node_modules/h3/dist/index.mjs';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const addNode = defineEventHandler(async (event) => {
  const { parentPath, newNode } = await readBody(event);
  if (!parentPath || !newNode) {
    return { error: "Os par\xE2metros `parentPath` e `newNode` s\xE3o necess\xE1rios." };
  }
  const filePath = path.resolve("server/data/nodes.json");
  try {
    let findNodeByPath = function(node, targetPath) {
      if (node._path === targetPath) {
        return node;
      }
      if (node.children && node.children.length > 0) {
        for (let child of node.children) {
          const found = findNodeByPath(child, targetPath);
          if (found) return found;
        }
      }
      return null;
    };
    const fileContent = await readFile(filePath, "utf8");
    const nodes = JSON.parse(fileContent);
    console.log("nodes:", nodes);
    console.log("---");
    const parentNode = findNodeByPath(nodes, parentPath);
    console.log("parentNode:", parentNode);
    if (!parentNode) {
      return { error: `N\xF3 pai com _path "${parentPath}" n\xE3o encontrado.` };
    }
    if (!parentNode.children) {
      parentNode.children = [];
    }
    parentNode.children.push(newNode);
    await writeFile(filePath, JSON.stringify(nodes, null, 2), "utf8");
    return { message: "N\xF3 adicionado com sucesso.", node: newNode };
  } catch (error) {
    console.error("Erro ao acessar o arquivo JSON:", error);
    return { error: "Erro ao acessar os dados." };
  }
});

export { addNode as default };
//# sourceMappingURL=add-node.mjs.map
