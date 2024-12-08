import { readFileSync } from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

export default defineEventHandler((event) => {
  const query = getQuery(event);

  // Carrega o nodes.json para mapear _path para _id
//   const nodesPath = path.resolve('server/data/nodes.json');
//   const nodes = JSON.parse(readFileSync(nodesPath, 'utf-8'));

//   // Busca o _id correspondente ao _path fornecido
//   const node = nodes.children.find((n) => n._path === query.path);

//   if (!node) {
//     throw createError({ statusCode: 404, message: 'Caminho não encontrado no nodes.json' });
//   }

  const db = new Database('server/data/database.db', { readonly: true });

//   console.log('node._id:', node._id)
  // Busca os dados no banco de dados pelo _id
  const page = db.prepare('SELECT * FROM content WHERE _id = ?').get(query.path.split('/')[1]);
    console.log('page', page)
  if (!page) {
    throw createError({ statusCode: 404, message: 'Página não encontrada no banco de dados' });
  }

  return page;
});
