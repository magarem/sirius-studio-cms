import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { resolve } from 'path';
// import generateSite from "../../scripts/generate-site";

export default defineEventHandler(async (event) => {
  try {
    console.log("Iniciando a geração do site...");

    
    // Caminho do banco de dados SQLite
    // const dbPath = path.resolve("server/data/database.db");
    const projectDir = process.cwd();

    // Caminho relativo para o banco de dados
    const dbPath = resolve(projectDir, 'server', 'data', 'database.db');

    const db = new Database(dbPath);

    // Caminho para o arquivo nodes.json
    // const nodesPath = path.resolve("server/data/nodes.json");
    const nodesPath = resolve(projectDir, 'server', 'data', 'nodes.json');
    
    const nodes = JSON.parse(fs.readFileSync(nodesPath, "utf-8"));

    // Caminho da pasta de saída para os arquivos MD
    const outputPath = path.resolve("content");

    // Função recursiva para compilar os nós
    const compileNode = (node, parentPath = "") => {
      const nodePath = path.join(outputPath, parentPath, node._slug);

      // Busca o conteúdo do banco de dados
      const content = db
        .prepare("SELECT content FROM content WHERE _id = ?")
        .get(node._id)?.content || "";

      if (node.children && node.children.length > 0) {
        // Nó com filhos: cria uma pasta e um index.md
        fs.mkdirSync(nodePath, { recursive: true });

        // Cria o arquivo index.md com o conteúdo do pai
        fs.writeFileSync(
          path.join(nodePath, "index.md"),
          `${content}`
        );

        // Recurse nos filhos
        node.children.forEach((child) => compileNode(child, path.join(parentPath, node._slug)));
      } else {
        // Nó sem filhos: cria um arquivo MD diretamente
        fs.writeFileSync(
          `${nodePath}.md`,
          `${content}`
        );
      }
    };

    // Processa todos os nós do JSON
    nodes.children.forEach((node) => compileNode(node));

    // Chama o script para executar o comando
    // const output = await generateSite();
    console.log("Site gerado com sucesso!");
    // return { success: true, message: "Site gerado com sucesso!", output };
    const response = await $fetch("/api/generate", {
      method: "POST",
      headers: {
        Authorization: "Bearer your-secure-token", // Caso tenha autenticação
      },
    });

    return { success: true, message: "Conteúdo compilado com sucesso!"};
  } catch (error) {
    console.error("Erro ao compilar o conteúdo:", error);
    return { success: false, error: error.message };
  }
});
