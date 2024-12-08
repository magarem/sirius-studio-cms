import { defineEventHandler } from 'file:///home/maga/dev/sirius5/node_modules/h3/dist/index.mjs';
import { readFileSync } from 'fs';
import path from 'path';

const nodes = defineEventHandler(() => {
  const filePath = path.resolve("server/data/nodes.json");
  const nodes = JSON.parse(readFileSync(filePath, "utf-8"));
  return nodes;
});

export { nodes as default };
//# sourceMappingURL=nodes.mjs.map
