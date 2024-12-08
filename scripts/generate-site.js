import { exec } from "child_process";
import path from "path";
import { promises as fs } from "fs";

// Caminho do projeto
const projectDir = path.resolve(process.cwd());

// Função para gerar o site
async function generateSite() {
  console.log("Iniciando a geração do site...");

  try {
    const output = await new Promise((resolve, reject) => {
      exec("npm run generate", { cwd: projectDir }, (error, stdout, stderr) => {
        if (error) {
          reject(stderr || stdout);
        } else {
          resolve(stdout);
        }
      });
    });

    console.log("Site gerado com sucesso!");
    console.log(output);
  } catch (error) {
    console.error("Erro ao gerar o site:", error);
    process.exit(1);
  }
}

// Executa a geração do site
generateSite();
