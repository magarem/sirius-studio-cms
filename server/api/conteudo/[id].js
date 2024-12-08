import Database from 'better-sqlite3'
import { join } from 'path'
import matter from 'gray-matter'

export default defineEventHandler((event) => {
  // Define o caminho para o banco de dados
  const dbPath = join(process.cwd(), 'data', 'content.db')
  
  // Conecta ao banco de dados
  const db = new Database(dbPath, { verbose: console.log })

  // Obtém o ID do parâmetro de rota
  const { id } = event.context.params

  try {
    // Prepara a consulta para buscar o campo de texto completo
    const stmt = db.prepare('SELECT * FROM content WHERE id = ?')
    const row = stmt.get(id) // Busca o registro específico pelo ID

    const { data: frontmatter, content: markdownContent } = matter(row.body)

    // Retorna o frontmatter e o conteúdo do Markdown
    return { frontmatter, markdownContent }

  } finally {
    // Fecha a conexão com o banco de dados
    db.close()
  }
})
