import { defineEventHandler, createError } from 'file:///home/maga/dev/sirius-studio-cms/node_modules/h3/dist/index.mjs';
import { exec } from 'child_process';
import path from 'path';

const generate_post = defineEventHandler(async (event) => {
  const projectDir = path.resolve(process.cwd());
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
    console.log("Iniciando a gera\xE7\xE3o do site...");
    const output = await generateSite();
    console.log("Site gerado com sucesso!");
    return { success: true, message: "Site gerado com sucesso!", output };
  } catch (error) {
    console.error("Erro ao gerar o site:", error);
    throw createError({
      statusCode: 500,
      message: `Erro ao gerar o site: ${error}`
    });
  }
});

export { generate_post as default };
//# sourceMappingURL=generate.post.mjs.map
