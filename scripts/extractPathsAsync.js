import { promises as fs } from 'fs';

const extractPathsAsync = async () => {
  try {
    // Lê o arquivo nodes.json de forma assíncrona
    const fileContent = await fs.readFile('server/data/nodes.json', 'utf-8');
    const nodes = JSON.parse(fileContent);

    // Função recursiva para extrair os _path
    const collectPaths = (node, paths = []) => {
      paths.push(node._path);
      if (node.children && node.children.length > 0) {
        node.children.forEach(child => collectPaths(child, paths));
      }
      return paths;
    };

    // Extrai os caminhos a partir do nó raiz
    return collectPaths(nodes);
  } catch (error) {
    console.error('Erro ao processar o arquivo nodes.json:', error);
    throw error;
  }
};

export default extractPathsAsync;
