import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDatabase } from './database.mjs';

const demo = process.argv.includes('--demo');
const baseDir = fileURLToPath(new URL('.', import.meta.url));
const dbFile = resolve(process.env.TODO_DB || resolve(baseDir, 'data', demo ? 'demo.sqlite' : 'tasks.sqlite'));
const port = Number(process.env.PORT || 8891);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT phải thuộc khoảng 1–65535.');

const staticFiles = new Map([
    ['/', ['index.html', 'text/html']],
    ['/app.js', ['app.js', 'text/javascript']],
    ['/style.css', ['style.css', 'text/css']]
].map(([path, [file, type]]) => [path, { type, body: readFileSync(new URL(`./public/${file}`, import.meta.url)) }]));
const db = openDatabase(dbFile, demo);
const categories = ['study', 'project', 'personal'];
const priorities = ['low', 'normal', 'high'];
const statuses = ['todo', 'doing', 'done'];

function fail(code, message) {
    throw Object.assign(new Error(message), { statusCode: code });
}

function respond(res, code, value) {
    res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(value));
}

async function readJson(req) {
    if (req.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') {
        fail(415, 'Yêu cầu phải gửi dữ liệu JSON.');
    }
    let size = 0;
    const chunks = [];
    // Consume the body before responding so the client receives a JSON error.
    for await (const chunk of req) {
        size += chunk.length;
        if (size <= 16_384) chunks.push(chunk);
    }
    if (size > 16_384) fail(413, 'Nội dung vượt quá giới hạn.');
    let data;
    try { data = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
    catch { fail(400, 'Dữ liệu JSON không hợp lệ.'); }
    if (!data || typeof data !== 'object' || Array.isArray(data)) fail(400, 'Cần gửi một đối tượng JSON.');
    return data;
}

function validatedStatus(value) {
    if (!statuses.includes(value)) fail(400, 'Trạng thái công việc không hợp lệ.');
    return value;
}

function taskData(data) {
    const title = typeof data.title === 'string' ? data.title.trim() : '';
    const description = typeof data.description === 'string' ? data.description.trim() : '';
    if (title.length < 1 || title.length > 100) fail(400, 'Tên công việc phải có từ 1 đến 100 ký tự.');
    if (data.description != null && typeof data.description !== 'string') fail(400, 'Mô tả phải là văn bản.');
    if (description.length > 500) fail(400, 'Mô tả tối đa 500 ký tự.');
    if (!categories.includes(data.category)) fail(400, 'Nhóm công việc không hợp lệ.');
    if (!priorities.includes(data.priority)) fail(400, 'Mức ưu tiên không hợp lệ.');
    const due = data.due_date ?? null;
    if (due !== null) {
        const parsed = typeof due === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(due)
            ? new Date(due + 'T00:00:00Z') : new Date(NaN);
        if (!Number.isFinite(parsed.getTime()) || due.startsWith('0000') || parsed.toISOString().slice(0, 10) !== due) {
            fail(400, 'Ngày đến hạn không hợp lệ.');
        }
    }
    return { title, description, category: data.category, priority: data.priority, due_date: due };
}

function existing(task) {
    if (!task) fail(404, 'Không tìm thấy công việc.');
    return task;
}

const server = createServer(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Security-Policy', "default-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'");
    try {
        const { pathname } = new URL(req.url, 'http://localhost');
        const asset = staticFiles.get(pathname);
        const method = req.method;
        if (asset && (method === 'GET' || method === 'HEAD')) {
            res.writeHead(200, { 'Content-Type': asset.type + '; charset=utf-8' });
            res.end(method === 'HEAD' ? undefined : asset.body);
            return;
        }

        if (pathname === '/api/tasks') {
            if (method === 'GET') return respond(res, 200, db.dashboard());
            if (method === 'POST') {
                const data = await readJson(req);
                return respond(res, 201, db.add({ ...taskData(data), status: validatedStatus(data.status ?? 'todo') }));
            }
            res.setHeader('Allow', 'GET, POST');
            fail(405, 'Phương thức không được hỗ trợ.');
        }

        const match = /^\/api\/tasks\/([1-9]\d*)(\/status)?$/.exec(pathname);
        if (!match) fail(404, 'Không tìm thấy đường dẫn.');
        const id = Number(match[1]);
        if (!Number.isSafeInteger(id)) fail(404, 'Không tìm thấy công việc.');
        if (match[2]) {
            if (method === 'PATCH') return respond(res, 200, existing(db.status(id, validatedStatus((await readJson(req)).status))));
            res.setHeader('Allow', 'PATCH');
        } else {
            if (method === 'PUT') return respond(res, 200, existing(db.update(id, taskData(await readJson(req)))));
            if (method === 'DELETE') {
                existing(db.delete(id));
                res.writeHead(204);
                res.end();
                return;
            }
            res.setHeader('Allow', 'PUT, DELETE');
        }
        fail(405, 'Phương thức không được hỗ trợ.');
    } catch (error) {
        const status = error.statusCode ?? 500;
        if (status === 500) console.error(error);
        if (!res.headersSent && !res.destroyed) {
            respond(res, status, { error: status === 500 ? 'Máy chủ chưa xử lý được yêu cầu. Vui lòng thử lại.' : error.message });
        }
    }
});
server.requestTimeout = 15_000;
server.on('close', () => db.close());
server.on('error', error => {
    console.error(error.code === 'EADDRINUSE' ? `Cổng ${port} đang được sử dụng. Hãy chọn PORT khác.` : error.message);
    db.close();
    process.exitCode = 1;
});
process.on('SIGINT', () => server.close());
process.on('SIGTERM', () => server.close());
server.listen(port, '127.0.0.1', () => {
    console.log(`Kế hoạch · http://127.0.0.1:${port}/`);
    console.log(`SQLite · ${dbFile}`);
});
