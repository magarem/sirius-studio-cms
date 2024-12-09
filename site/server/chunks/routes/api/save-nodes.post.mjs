import { defineEventHandler, readBody } from 'file:///home/maga/dev/sirius-studio-cms/node_modules/h3/dist/index.mjs';
import { promises } from 'fs';
import path from 'path';

const saveNodes_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { nodes } = body;
    if (!nodes) {
      throw new Error("Nenhum dado fornecido");
    }
    const filePath = path.resolve("server/data/nodes.json");
    await promises.writeFile(filePath, JSON.stringify(nodes, null, 2), "utf-8");
    return { status: 200, message: "\xC1rvore salva com sucesso!" };
  } catch (error) {
    console.error("Erro ao salvar a \xE1rvore:", error);
    return { status: 500, message: "Erro interno do servidor" };
  }
});

export { saveNodes_post as default };
//# sourceMappingURL=save-nodes.post.mjs.map
