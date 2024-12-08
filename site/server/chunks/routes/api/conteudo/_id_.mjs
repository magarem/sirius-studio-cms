import { defineEventHandler } from 'file:///home/maga/dev/sirius5/node_modules/h3/dist/index.mjs';
import Database from 'file:///home/maga/dev/sirius5/node_modules/better-sqlite3/lib/index.js';
import { join } from 'path';
import matter from 'file:///home/maga/dev/sirius5/node_modules/gray-matter/index.js';

const _id_ = defineEventHandler((event) => {
  const dbPath = join(process.cwd(), "data", "content.db");
  const db = new Database(dbPath, { verbose: console.log });
  const { id } = event.context.params;
  try {
    const stmt = db.prepare("SELECT * FROM content WHERE id = ?");
    const row = stmt.get(id);
    const { data: frontmatter, content: markdownContent } = matter(row.body);
    return { frontmatter, markdownContent };
  } finally {
    db.close();
  }
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
