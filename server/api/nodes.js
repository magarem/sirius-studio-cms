import { readFileSync } from 'fs';
import path from 'path';

export default defineEventHandler(() => {
  const filePath = path.resolve('server/data/nodes.json');
  const nodes = JSON.parse(readFileSync(filePath, 'utf-8'));
  return nodes;
});