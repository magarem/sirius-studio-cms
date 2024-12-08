import { exec } from "child_process";
import path from "path";

export default defineEventHandler(async (event) => {
  // Caminho do diretório do projeto
//   const projectDir = path.resolve(process.cwd());
  const projectDir = path.resolve("/home/maga/dev/sirius5");

  // Função para executar o comando de geração do site
  const generateSite = () => {
    return new Promise((resolve, reject) => {
      exec("npm run generate", { cwd: projectDir }, (error, stdout, stderr) => {
        if (error) {
          reject(stderr || stdout);
        } else {
          resolve(stdout);
        }
      });
    });
  };

  try {
    console.log("Iniciando a geração do site...");

    // Executa a geração do site
    const output = await generateSite();

    console.log("Site gerado com sucesso!");
    return { success: true, message: "Site gerado com sucesso!", output };
  } catch (error) {
    console.error("Erro ao gerar o site:", error);
    throw createError({
      statusCode: 500,
      message: `Erro ao gerar o site: ${error}`,
    });
  }
});
