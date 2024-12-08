import { readFileSync } from 'fs';
import path from 'path';

const nodes = JSON.parse(
  readFileSync(path.resolve('server/data/nodes.json'), 'utf-8')
);

export default nodes;