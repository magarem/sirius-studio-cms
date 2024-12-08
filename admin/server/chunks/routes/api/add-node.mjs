import { d as defineEventHandler, r as readBody } from '../../nitro/nitro.mjs';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import 'unified';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'detab';
import 'micromark-util-sanitize-uri';
import 'hast-util-to-string';
import 'github-slugger';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';

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
