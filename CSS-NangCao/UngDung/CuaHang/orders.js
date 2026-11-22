const target = document.querySelector('#order-list');
const products = new Map(catalog.map(product => [product.slug, product]));
const currency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
let history;
try { history = JSON.parse(localStorage.getItem('phong-select-fe:orders')); }
catch { history = []; }

for (const order of Array.isArray(history) ? history.slice().reverse() : []) {
    if (!order || typeof order.id !== 'string' || !Array.isArray(order.lines)) continue;
    const block = document.createElement('article');
    block.className = 'panel panel-default';
    const heading = document.createElement('h2');
    heading.className = 'panel-heading';
    heading.textContent = `Đơn ${order.id} · Đã ghi nhận`;
    const details = document.createElement('div');
    details.className = 'panel-body';
    const list = document.createElement('ul');
    let total = 0;
    for (const line of order.lines) {
        const product = products.get(line?.id);
        if (!product || !Number.isInteger(line.qty) || line.qty <= 0) continue;
        const item = document.createElement('li');
        item.textContent = `${product.name} · ${line.variant} × ${line.qty}`;
        list.append(item);
        total += line.qty * product.price;
    }
    const value = document.createElement('strong');
    value.textContent = `Tổng tiền ${currency.format(total)}`;
    details.append(list, value);
    block.append(heading, details);
    target.append(block);
}
if (!target.children.length) target.textContent = 'Bạn chưa tạo đơn mô phỏng.';
