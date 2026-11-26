import { DatabaseSync } from 'node:sqlite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultFile = new URL('./data/demo.sqlite', import.meta.url);
const file = process.argv[2] ? resolve(process.argv[2]) : fileURLToPath(defaultFile);
const db = new DatabaseSync(file, { readOnly: true });
try {
    const integrity = db.prepare('PRAGMA integrity_check').get().integrity_check;
    const columns = db.prepare('PRAGMA table_info(tasks)').all();
    const rows = db.prepare('SELECT id, title, due_date, status FROM tasks ORDER BY id').all();
    const count = db.prepare('SELECT status, COUNT(*) AS total FROM tasks GROUP BY status ORDER BY status').all();
    console.log(JSON.stringify({ file, integrity, columns, rows, count }, null, 2));
} finally {
    db.close();
}
