import { readFileSync } from 'fs';
import { resolve } from 'path';

export default defineEventHandler(() => {
  const nodesFilePath = resolve(process.cwd(), 'server', 'data', 'nodes.json');
  
  try {
    const data = JSON.parse(readFileSync(nodesFilePath, 'utf-8'));
    console.log('data>>>', data)
    return data;
  } catch (error) {
    console.error('Erro ao carregar nodes.json:', error.message);
    return { success: false, error: error.message };
  }
});
