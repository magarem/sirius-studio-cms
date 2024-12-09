import {promises as fs} from "fs";
import Database from "better-sqlite3";
import path from "path";
import grayMatter from "gray-matter";

/**
 * Busca o item no JSON baseado no `_path`.
 *
 * @param {Array} nodes - Array de nós para busca.
 * @param {String} targetPath - O `_path` do item a ser buscado.
 * @returns {Object|null} - O item encontrado ou null se não existir.
 */
function findItemByPath(nodes, targetPath) {
  console.log('nodes:', nodes);
  for (const node of nodes) {
    if (node._path === targetPath) {
      return node;
    }
    if (node.children && node.children.length > 0) {
      const result = findItemByPath(node.children, targetPath);
      if (result) 
        return result;
      }
    }
  return null;
}

/**
 * Busca o conteúdo de um item no banco de dados SQLite.
 *
 * @param {String} id - O `_id` do item.
 * @param {Object} db - Instância do banco de dados SQLite.
 * @returns {String} - O conteúdo do item ou uma string vazia.
 */
function getContentFromDatabase(id, db) {
  const query = db.prepare("SELECT content FROM content WHERE _id = ?");
  const row = query.get(id);
  console.log('row.content:', row.content);
  return row
    ? row.content
    : "";
}

export default defineEventHandler(async event => {
  const {_path} = getQuery(event); // Obtém o _path da query string
  console.log("path:", _path);
  if (!_path) {
    return {
      statusCode: 400,
      body: {
        message: 'O parâmetro "path" é obrigatório.'
      }
    };
  }

  try {
    // Caminho do arquivo JSON e do banco de dados
    const filePath = path.resolve("server/data/nodes.json");
    const dbPath = path.resolve("server/data/database.db");

    // Lê o conteúdo do arquivo
    const fileContent = await fs.readFile(filePath, "utf-8");
    const jsonTree = JSON.parse(fileContent);

    // Abre o banco de dados SQLite
    const db = new Database(dbPath, {readonly: true});

    // Busca o item no JSON
    const item = findItemByPath(jsonTree.children || [], _path);
    console.log('_path:', _path);
    if (item) {
      // Busca o conteúdo do banco de dados e adiciona ao item
      //   item.content = getContentFromDatabase(item._id, db);
      const content = getContentFromDatabase(item._id, db) || '';
      const { data: frontmatter, content: markdownContent } = grayMatter(content);

      // Fecha o banco de dados
      db.close();

      item.frontmatter = frontmatter;
      item.content = markdownContent;
      return {
        statusCode: 200,
        body: {
          data: item
        }
      };
    } else {
      db.close();
      return {
        statusCode: 404,
        body: {
          message: "Item não encontrado para o caminho fornecido."
        }
      };
    }
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    return {
      statusCode: 500,
      body: {
        message: "Erro interno do servidor."
      }
    };
  }
});
