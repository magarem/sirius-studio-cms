import { defineEventHandler } from 'file:///home/maga/dev/sirius5/node_modules/h3/dist/index.mjs';
import Database from 'file:///home/maga/dev/sirius5/node_modules/better-sqlite3/lib/index.js';
import fs from 'fs';
import path from 'path';

const compileContent = defineEventHandler(async (event) => {
  try {
    console.log("Iniciando a gera\xE7\xE3o do site...");
    const dbPath = path.resolve("/home/maga/dev/sirius5/server/data/database.db");
    const db = new Database(dbPath);
    const nodesPath = path.resolve("/home/maga/dev/sirius5/server/data/nodes.json");
    const nodes = JSON.parse(fs.readFileSync(nodesPath, "utf-8"));
    const outputPath = path.resolve("content");
    const compileNode = (node, parentPath = "") => {
      var _a;
      const nodePath = path.join(outputPath, parentPath, node._slug);
      const content = ((_a = db.prepare("SELECT content FROM content WHERE _id = ?").get(node._id)) == null ? void 0 : _a.content) || "";
      if (node.children && node.children.length > 0) {
        fs.mkdirSync(nodePath, { recursive: true });
        fs.writeFileSync(
          path.join(nodePath, "index.md"),
          `${content}`
        );
        node.children.forEach((child) => compileNode(child, path.join(parentPath, node._slug)));
      } else {
        fs.writeFileSync(
          `${nodePath}.md`,
          `${content}`
        );
      }
    };
    nodes.children.forEach((node) => compileNode(node));
    console.log("Site gerado com sucesso!");
    const response = await $fetch("/api/generate", {
      method: "POST",
      headers: {
        Authorization: "Bearer your-secure-token"
        // Caso tenha autenticação
      }
    });
    return { success: true, message: "Conte\xFAdo compilado com sucesso!" };
  } catch (error) {
    console.error("Erro ao compilar o conte\xFAdo:", error);
    return { success: false, error: error.message };
  }
});

export { compileContent as default };
//# sourceMappingURL=compileContent.mjs.map
