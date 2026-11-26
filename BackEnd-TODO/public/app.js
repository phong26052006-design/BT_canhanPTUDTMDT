const select = selector => document.querySelector(selector);
const categories = { study: 'Học tập', project: 'Dự án', personal: 'Cá nhân' };
const priorities = { low: 'Thấp', normal: 'Bình thường', high: 'Cao' };
const search = select('#search');
const filter = select('#filter');
const list = select('#tasks');
const editor = select('#editor');
const editForm = select('#task-form');
const confirmDelete = select('#confirm-delete');
const deleteForm = select('#delete-form');
const retry = select('#retry');
let dashboard;
let editId = null;
let deleteId = null;
let busy = false;

async function request(path = '/api/tasks', method = 'GET', data) {
    const options = { method };
    if (data !== undefined) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(data);
    }
    let response;
    try { response = await fetch(path, options); }
    catch { throw new Error('Không kết nối được máy chủ. Vui lòng thử lại.'); }
    if (response.status === 204) return;
    const value = await response.json();
    if (!response.ok) throw new Error(value.error || 'Yêu cầu chưa hoàn tất.');
    return value;
}

function message(element, text, error = false) {
    element.textContent = text;
    element.hidden = !text;
    element.toggleAttribute('data-error', error);
}

function dateLabel(date) {
    return date ? date.split('-').reverse().join('/') : 'Chưa đặt';
}

function render() {
    const { stats, today, tasks } = dashboard;
    select('#today').textContent = new Intl.DateTimeFormat('vi-VN', {
        dateStyle: 'full', timeZone: 'UTC'
    }).format(new Date(today + 'T00:00:00Z'));
    for (const key of ['total', 'todo', 'doing', 'done']) select('#count-' + key).textContent = stats[key];
    const percent = stats.total ? Math.round(100 * stats.done / stats.total) : 0;
    select('#percent').textContent = percent + '%';
    select('#progress').value = percent;
    select('#overdue').textContent = stats.overdue ? stats.overdue + ' công việc quá hạn' : 'Không có công việc quá hạn';
    renderTasks(tasks, today);
}

function renderTasks(tasks = dashboard?.tasks, today = dashboard?.today) {
    if (!tasks) return;
    const keyword = search.value.trim().toLocaleLowerCase('vi');
    const visible = tasks.filter(task =>
        (filter.value === 'all' || filter.value === task.status) &&
        (task.title + ' ' + task.description).toLocaleLowerCase('vi').includes(keyword));
    const fragment = document.createDocumentFragment();
    for (const task of visible) fragment.append(taskElement(task, today));
    list.replaceChildren(fragment);
    select('#result-count').textContent = `${visible.length} / ${tasks.length} công việc`;
    const empty = tasks.length ? 'Không có công việc phù hợp với bộ lọc.' : 'Danh sách đang trống. Thêm công việc để bắt đầu.';
    message(select('#empty'), visible.length ? '' : empty);
}

function taskElement(task, today) {
    const node = select('#task-row').content.firstElementChild.cloneNode(true);
    const get = selector => node.querySelector(selector);
    node.dataset.id = task.id;
    node.dataset.status = task.status;
    get('h3').textContent = task.title;
    message(get('.description'), task.description);
    get('.category').textContent = categories[task.category];
    get('.priority').textContent = 'Ưu tiên ' + priorities[task.priority].toLocaleLowerCase('vi');
    get('.priority').classList.toggle('high', task.priority === 'high');
    get('time').textContent = dateLabel(task.due_date);
    if (task.due_date) get('time').dateTime = task.due_date;
    get('.late').hidden = !task.due_date || task.due_date >= today || task.status === 'done';
    const state = get('.task-status');
    state.value = task.status;
    state.setAttribute('aria-label', 'Trạng thái của ' + task.title);
    state.addEventListener('change', () => changeStatus(task, state));
    const edit = get('.edit');
    edit.setAttribute('aria-label', 'Sửa ' + task.title);
    edit.addEventListener('click', () => openEditor(task));
    const remove = get('.delete');
    remove.setAttribute('aria-label', 'Xóa ' + task.title);
    remove.addEventListener('click', () => openDelete(task));
    return node;
}

async function refresh(success = '') {
    retry.hidden = true;
    try {
        dashboard = await request();
        render();
        message(select('#notice'), success);
        return true;
    } catch (error) {
        message(select('#notice'), success ? success + ' Chưa tải lại được danh sách.' : error.message, true);
        retry.hidden = false;
        return false;
    }
}

function openEditor(task) {
    if (busy) return;
    editId = task?.id ?? null;
    editForm.reset();
    editForm.elements.priority.value = 'normal';
    if (task) {
        for (const key of ['title', 'description', 'category', 'priority', 'due_date']) {
            editForm.elements[key].value = task[key] ?? '';
        }
    }
    select('#editor-title').textContent = task ? 'Sửa công việc' : 'Thêm công việc';
    message(select('#editor-error'), '');
    editor.showModal();
}

function openDelete(task) {
    if (busy) return;
    deleteId = task.id;
    select('#delete-name').textContent = task.title;
    message(select('#delete-error'), '');
    confirmDelete.showModal();
}

async function submitDialog({ form, dialog, errorBox, operation, success, focus }) {
    if (busy) return;
    busy = true;
    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    message(errorBox, '');
    try {
        await operation();
        dialog.close();
        await refresh(success);
        focus()?.focus();
    } catch (error) {
        message(errorBox, error.message, true);
    } finally {
        submit.disabled = false;
        busy = false;
    }
}

async function changeStatus(task, control) {
    if (busy) {
        control.value = task.status;
        return;
    }
    busy = true;
    control.disabled = true;
    try {
        await request(`/api/tasks/${task.id}/status`, 'PATCH', { status: control.value });
    } catch (error) {
        control.value = task.status;
        control.disabled = false;
        busy = false;
        message(select('#notice'), error.message, true);
        control.focus();
        return;
    }
    const refreshed = await refresh('Đã cập nhật trạng thái.');
    if (refreshed) (select(`[data-id="${task.id}"] .task-status`) || filter).focus();
    else control.disabled = false;
    busy = false;
}

editForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(editForm));
    data.due_date ||= null;
    const id = editId;
    void submitDialog({
        form: editForm, dialog: editor, errorBox: select('#editor-error'),
        operation: () => request(id ? `/api/tasks/${id}` : '/api/tasks', id ? 'PUT' : 'POST', data),
        success: id ? 'Đã lưu nội dung cập nhật.' : 'Đã thêm công việc.',
        focus: () => (id && select(`[data-id="${id}"] .edit`)) || select('#add')
    });
});

deleteForm.addEventListener('submit', event => {
    event.preventDefault();
    void submitDialog({
        form: deleteForm, dialog: confirmDelete, errorBox: select('#delete-error'),
        operation: () => request(`/api/tasks/${deleteId}`, 'DELETE'),
        success: 'Đã xóa công việc.', focus: () => select('#add')
    });
});

for (const dialog of [editor, confirmDelete]) {
    dialog.addEventListener('cancel', event => { if (busy) event.preventDefault(); });
}
for (const button of document.querySelectorAll('[data-close]')) {
    button.addEventListener('click', () => { if (!busy) select('#' + button.dataset.close).close(); });
}

function markNavigation() {
    for (const link of document.querySelectorAll('nav a')) {
        if (link.hash === (location.hash || '#tong-quan')) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    }
}

select('#add').addEventListener('click', () => openEditor());
search.addEventListener('input', () => renderTasks());
filter.addEventListener('change', () => renderTasks());
retry.addEventListener('click', () => { if (!busy) void refresh(); });
window.addEventListener('hashchange', markNavigation);
markNavigation();
void refresh();
