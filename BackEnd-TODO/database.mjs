import { mkdirSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const calendar = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric', month: '2-digit', day: '2-digit' });

export function today() {
    const parts = Object.fromEntries(calendar.formatToParts().map(({ type, value }) => [type, value]));
    return `${parts.year}-${parts.month}-${parts.day}`;
}

export function openDatabase(file, demo) {
    mkdirSync(dirname(file), { recursive: true });
    const db = new DatabaseSync(file);
    db.exec('PRAGMA busy_timeout = 3000;');
    db.exec(readFileSync(new URL('./schema.sql', import.meta.url), 'utf8'));
    const insert = db.prepare(`
        INSERT INTO tasks (title, description, category, priority, due_date, status)
        VALUES (?, ?, ?, ?, ?, ?) RETURNING *
    `);
    const update = db.prepare(`
        UPDATE tasks SET title=?, description=?, category=?, priority=?, due_date=?,
            updated_at=CURRENT_TIMESTAMP WHERE id=? RETURNING *
    `);
    const changeStatus = db.prepare(`
        UPDATE tasks SET status=?, updated_at=CURRENT_TIMESTAMP WHERE id=? RETURNING *
    `);
    const remove = db.prepare('DELETE FROM tasks WHERE id = ? RETURNING id');
    const list = db.prepare(`
        SELECT * FROM tasks
        ORDER BY CASE status WHEN 'todo' THEN 0 WHEN 'doing' THEN 1 ELSE 2 END,
            due_date IS NULL, due_date, id DESC
    `);
    const count = db.prepare(`
        SELECT COUNT(*) AS total,
            COUNT(CASE WHEN status = 'todo' THEN 1 END) AS todo,
            COUNT(CASE WHEN status = 'doing' THEN 1 END) AS doing,
            COUNT(CASE WHEN status = 'done' THEN 1 END) AS done,
            COUNT(CASE WHEN status <> 'done' AND due_date < ? THEN 1 END) AS overdue
        FROM tasks
    `);

    if (demo && db.prepare('PRAGMA user_version').get().user_version === 0) {
        const dateAt = offset => {
            const date = new Date(today() + 'T00:00:00Z');
            date.setUTCDate(date.getUTCDate() + offset);
            return date.toISOString().slice(0, 10);
        };
        const entries = [
            ['Nộp báo cáo Back End', 'Đính kèm mã nguồn và minh chứng chạy thử.', 'study', 'high', dateAt(0), 'todo'],
            ['Đọc tài liệu API và SQLite', 'Ghi chú về thao tác CRUD và truy vấn thống kê.', 'study', 'normal', dateAt(2), 'todo'],
            ['Hoàn thiện bảng quản lý công việc', 'Rà soát bố cục và trạng thái trên điện thoại.', 'project', 'high', dateAt(-1), 'doing'],
            ['Chuẩn bị nội dung trình bày', 'Lập dàn ý ngắn cho buổi trình bày.', 'personal', 'low', dateAt(4), 'doing'],
            ['Phác thảo luồng sử dụng', 'Xác định thao tác thêm, sửa và đổi trạng thái.', 'project', 'normal', dateAt(-3), 'done'],
            ['Tổng hợp tiêu chí bài tập', 'Đối chiếu giao diện, cơ sở dữ liệu và vận hành.', 'study', 'normal', dateAt(-2), 'done']
        ];
        db.exec('BEGIN IMMEDIATE');
        try {
            if (db.prepare('PRAGMA user_version').get().user_version === 0) {
                for (const entry of entries) insert.get(...entry);
                db.exec('PRAGMA user_version = 1');
            }
            db.exec('COMMIT');
        } catch (error) {
            db.exec('ROLLBACK');
            db.close();
            throw error;
        }
    }

    return {
        dashboard() {
            const day = today();
            return { today: day, tasks: list.all(), stats: count.get(day) };
        },
        add: task => insert.get(...fields(task), task.status),
        update: (id, task) => update.get(...fields(task), id),
        status: (id, value) => changeStatus.get(value, id),
        delete: id => remove.get(id),
        close: () => db.close()
    };
}

function fields(task) {
    return [task.title, task.description, task.category, task.priority, task.due_date];
}
