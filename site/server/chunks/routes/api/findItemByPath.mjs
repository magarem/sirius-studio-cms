import { defineEventHandler, getQuery } from 'file:///home/maga/dev/sirius5/node_modules/h3/dist/index.mjs';
import { promises } from 'fs';
import Database from 'file:///home/maga/dev/sirius5/node_modules/better-sqlite3/lib/index.js';
import path from 'path';
import matter from 'file:///home/maga/dev/sirius5/node_modules/gray-matter/index.js';

function findItemByPath(nodes, targetPath) {
  for (const node of nodes) {
    if (node._path === targetPath) {
      return node;
    }
    if (node.children && node.children.length > 0) {
      const result = findItemByPath(node.children, targetPath);
      if (result)
        return result;
    }
  }
  return null;
}
function getContentFromDatabase(id, db) {
  const query = db.prepare("SELECT content FROM content WHERE _id = ?");
  const row = query.get(id);
  console.log("row.content:", row.content);
  return row ? row.content : "";
}
const findItemByPath$1 = defineEventHandler(async (event) => {
  const { _path } = getQuery(event);
  console.log("path:", _path);
  if (!_path) {
    return {
      statusCode: 400,
      body: {
        message: 'O par\xE2metro "path" \xE9 obrigat\xF3rio.'
      }
    };
  }
  try {
    const filePath = path.resolve("server/data/nodes.json");
    const dbPath = path.resolve("server/data/database.db");
    const fileContent = await promises.readFile(filePath, "utf-8");
    const jsonTree = JSON.parse(fileContent);
    const db = new Database(dbPath, { readonly: true });
    const item = findItemByPath(jsonTree.children || [], _path);
    if (item) {
      const content = getContentFromDatabase(item._id, db) || "";
      const { data: frontmatter, content: markdownContent } = matter(content);
      db.close();
      item.frontmatter = frontmatter;
      item.content = markdownContent;
      return {
        statusCode: 200,
        body: {
          data: item
        }
      };
    } else {
      db.close();
      return {
        statusCode: 404,
        body: {
          message: "Item n\xE3o encontrado para o caminho fornecido."
        }
      };
    }
  } catch (error) {
    console.error("Erro ao processar a requisi\xE7\xE3o:", error);
    return {
      statusCode: 500,
      body: {
        message: "Erro interno do servidor."
      }
    };
  }
});

export { findItemByPath$1 as default };
//# sourceMappingURL=findItemByPath.mjs.map
