import { d as defineEventHandler, r as readBody } from '../../nitro/nitro.mjs';
import { promises } from 'fs';
import { join } from 'path';
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

const generateSlug = (title) => {
  return title.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
};

const filePath = join(process.cwd(), "public", "data", "nodes.json");
const sqliteDataSave = async (data) => {
  console.log("sqliteDataSave:", data);
  try {
    const response = await $fetch("/api/upsert-sqlite", {
      method: "POST",
      body: data
    });
    return response;
  } catch (error) {
    console.error("Erro ao chamar a segunda API:", error);
    throw new Error("Erro ao processar a requisi\xE7\xE3o");
  }
};
const readJsonFile = async () => {
  try {
    const rawData = await promises.readFile(filePath, "utf8");
    return JSON.parse(rawData);
  } catch (error) {
    if (error.code === "ENOENT") {
      return { _id: "0", _path: "/", _type: "folder", label: "content", children: [] };
    }
    throw error;
  }
};
const writeJsonFile = async (data) => {
  await promises.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
};
const addOrUpdateNodeRecursively = (parentNode, parentId, newNode) => {
  if (parentNode._id === parentId) {
    if (!parentNode.children) {
      parentNode.children = [];
    }
    const computedPath = `${parentNode._path.replace(/\/$/, "")}/${generateSlug(newNode.label)}`.replace(/\/+/g, "/");
    newNode._path = computedPath;
    const index = parentNode.children.findIndex((child) => child._id === newNode._id);
    if (index !== -1) {
      parentNode.children[index] = { ...parentNode.children[index], ...newNode };
    } else {
      parentNode.children.push(newNode);
    }
    return true;
  }
  for (const child of parentNode.children) {
    if (addOrUpdateNodeRecursively(child, parentId, newNode)) {
      return true;
    }
  }
  return false;
};
const manageNode = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { action, parentId, node } = body;
  if (!action) {
    return { status: 400, message: "A\xE7\xE3o \xE9 necess\xE1ria (list, add, update)." };
  }
  try {
    const jsonData = await readJsonFile();
    switch (action) {
      case "list": {
        return { status: 200, nodes: jsonData };
      }
      case "get": {
        return { status: 200, nodes: jsonData };
      }
      case "add":
      case "update": {
        if (!parentId || !node || !node._id || !node.label) {
          return { status: 400, message: 'Par\xE2metros inv\xE1lidos. "parentId", "node._id" e "node.label" s\xE3o obrigat\xF3rios.' };
        }
        const updated = addOrUpdateNodeRecursively(jsonData, parentId, node);
        if (!updated) {
          return { status: 404, message: "N\xF3 pai n\xE3o encontrado." };
        }
        await writeJsonFile(jsonData);
        const secondApiResponse = await sqliteDataSave(node);
        return { status: 200, message: "N\xF3 adicionado/atualizado com sucesso." };
      }
      default:
        return { status: 400, message: 'A\xE7\xE3o inv\xE1lida. Use "list", "add", ou "update".' };
    }
  } catch (error) {
    console.error("Erro ao processar a requisi\xE7\xE3o:", error);
    return { status: 500, message: "Erro interno no servidor." };
  }
});

export { manageNode as default };
//# sourceMappingURL=manage-node.mjs.map
