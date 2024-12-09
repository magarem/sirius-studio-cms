import { defineEventHandler } from 'file:///home/maga/dev/sirius-studio-cms/node_modules/h3/dist/index.mjs';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const nodes = defineEventHandler(() => {
  const nodesFilePath = resolve(process.cwd(), "server", "data", "nodes.json");
  try {
    const data = JSON.parse(readFileSync(nodesFilePath, "utf-8"));
    console.log("data>>>", data);
    return data;
  } catch (error) {
    console.error("Erro ao carregar nodes.json:", error.message);
    return { success: false, error: error.message };
  }
});

export { nodes as default };
//# sourceMappingURL=nodes.mjs.map
