const $ = window.jQuery;
const money = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
const productById = new Map(catalog.map(product => [product.slug, product]));
const variants = ['Tiêu chuẩn', 'Kèm hộp quà'];
const ratingOptions = {
    filledStar: '★', emptyStar: '☆', showCaption: false, showClear: false,
    min: 0, max: 5, step: 0.5, size: 'xs',
};

function load(key, fallback) {
    try { return JSON.parse(localStorage.getItem(`phong-select-fe:${key}`)) ?? fallback; }
    catch { return fallback; }
}

function save(key, value) {
    try {
        localStorage.setItem(`phong-select-fe:${key}`, JSON.stringify(value));
        return true;
    } catch {
        return false;
    }
}

function inventory(product) {
    const sold = orders.flatMap(order => order.lines)
        .filter(line => line.id === product.slug).reduce((sum, line) => sum + line.qty, 0);
    return Math.max(0, product.stock - sold);
}

function sanitizeLines(lines) {
    const kept = [];
    for (const line of Array.isArray(lines) ? lines : []) {
        if (!line || !variants.includes(line.variant) || !Number.isInteger(line.qty) || line.qty < 1) continue;
        const product = productById.get(line.id);
        if (!product || kept.some(item => item.id === line.id && item.variant === line.variant)) continue;
        const prior = kept.filter(item => item.id === line.id).reduce((n, item) => n + item.qty, 0);
        const qty = Math.min(line.qty, inventory(product) - prior);
        if (qty > 0) kept.push({ id: line.id, variant: line.variant, qty });
    }
    return kept;
}

const orders = [];
const storedOrders = load('orders', []);
if (Array.isArray(storedOrders)) {
    for (const order of storedOrders) {
        if (!order || typeof order.id !== 'string') continue;
        const lines = Array.isArray(order.lines) ? order.lines.filter(line =>
            productById.has(line?.id) && variants.includes(line.variant) &&
            Number.isSafeInteger(line.qty) && line.qty > 0
        ) : [];
        if (lines.length) orders.push({ id: order.id, lines });
    }
}
let cart = sanitizeLines(load('cart', []));
let category = 'all';
const cartTemplate = document.querySelector('#cart-template');
document.body.append(cartTemplate.content.cloneNode(true));

function stockMarkup(product) {
    const stock = inventory(product);
    const percent = Math.round(100 * stock / product.capacity);
    return `<p class="muted">${stock ? `Còn ${stock} / ${product.capacity} sản phẩm` : 'Hết hàng'}</p>
    <div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-label="Số sản phẩm còn trong kho" aria-valuenow="${stock}" aria-valuemin="0" aria-valuemax="${product.capacity}" style="width:${percent}%"></div></div>`;
}

function renderRatings(scope) {
    // Do not use data-stars here: bootstrap-star-rating reserves data-stars for its star count.
    $(scope).find('input[data-product-rating]').each(function () {
        $(this).rating({ ...ratingOptions, displayOnly: true });
    });
}

function priceMarkup(product) {
    return `<span class="price">${money.format(product.price)} <del>${money.format(product.original)}</del></span>`;
}

function card(product) {
    return `<div class="col-xs-12 col-sm-6 col-md-4"><article class="product">
    <div class="product-media"><span class="ribbon sale">−${product.discount}%</span><span class="ribbon flag">${product.badge}</span><a href="detail.html?p=${product.slug}" aria-label="Xem ${product.name}"><img src="images/${product.slug}.svg" alt="${product.alt}"></a></div>
    <div class="product-copy"><p class="tagline">${product.label}</p><h3><a href="detail.html?p=${product.slug}">${product.name}</a></h3><p>${priceMarkup(product)}</p><input data-product-rating type="number" value="${product.rating}" aria-label="${product.rating} trên 5 sao"><div>${stockMarkup(product)}</div><a class="btn btn-primary" href="detail.html?p=${product.slug}">Xem chi tiết</a></div></article></div>`;
}

function renderCatalog() {
    const products = document.querySelector('#products');
    if (!products) return;
    const q = document.querySelector('#query').value.trim().toLocaleLowerCase('vi');
    const filtered = catalog.filter(item => (category === 'all' || item.category === category) && item.name.toLocaleLowerCase('vi').includes(q));
    products.innerHTML = filtered.map(card).join('');
    document.querySelector('#no-results').hidden = filtered.length > 0;
    document.querySelector('#product-count').textContent = `${filtered.length} sản phẩm`;
    renderRatings(products);
}

function renderCart() {
    const wrap = document.querySelector('#cart-lines');
    wrap.replaceChildren();
    document.querySelector('#cart-count').textContent = cart.reduce((sum, line) => sum + line.qty, 0);
    if (!cart.length) wrap.textContent = 'Giỏ hàng đang trống.';
    document.querySelector('#order').disabled = !cart.length;
    let total = 0;
    cart.forEach((line, index) => {
        const product = productById.get(line.id);
        total += line.qty * product.price;
        const row = document.createElement('div');
        row.className = 'cart-line';
        row.innerHTML = `<div><strong>${product.name}</strong><small>${line.variant} · ${money.format(product.price)}</small></div><input class="form-control" aria-label="Số lượng ${product.name} ${line.variant}" type="number" min="1" value="${line.qty}"><button class="btn btn-default" type="button">Xóa</button>`;
        row.querySelector('button').addEventListener('click', () => { cart.splice(index, 1); updateCart(); });
        row.querySelector('input').addEventListener('change', event => {
            const qty = event.target.valueAsNumber;
            const others = cart.filter(item => item.id === line.id && item !== line).reduce((sum, item) => sum + item.qty, 0);
            const possible = Number.isInteger(qty) && qty >= 1 && qty + others <= inventory(product);
            if (possible) line.qty = qty;
            document.querySelector('#cart-status').textContent = possible ? 'Đã cập nhật số lượng.' : 'Số lượng phải là số nguyên và nằm trong tồn kho.';
            updateCart();
        });
        wrap.append(row);
    });
    document.querySelector('#cart-total').textContent = `Tổng tiền ${money.format(total)}`;
}

function updateCart() {
    save('cart', cart);
    renderCart();
}

document.querySelector('#order').addEventListener('click', () => {
    if (!cart.length) return;
    const suffix = Array.from(crypto.getRandomValues(new Uint8Array(6)),
        byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
    const id = 'PS-' + suffix;
    const lines = cart.map(line => ({ ...line, unitPrice: productById.get(line.id).price }));
    const order = { id, lines };
    const status = document.querySelector('#cart-status');
    if (!save('orders', [...orders, order])) {
        status.textContent = 'Trình duyệt không lưu được đơn. Giỏ hàng vẫn sẵn sàng để thử lại.';
        return;
    }
    orders.push(order);
    cart = [];
    updateCart();
    renderCatalog();
    if (currentProduct) renderDetailStock(currentProduct);
    status.textContent = `Đã ghi đơn mô phỏng ${id} trên trình duyệt.`;
});

document.querySelector('#categories')?.addEventListener('click', event => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    category = button.dataset.category;
    for (const option of document.querySelectorAll('[data-category]')) {
        option.classList.toggle('active', button === option);
        option.setAttribute('aria-pressed', String(button === option));
    }
    renderCatalog();
});
document.querySelector('#query')?.addEventListener('input', renderCatalog);

function renderDetailStock(product) {
    const stock = inventory(product);
    document.querySelector('#stock-box').innerHTML = stockMarkup(product);
    document.querySelector('#quantity').max = stock;
    document.querySelector('#add-form button').disabled = stock < 1;
}

function installGallery(product) {
    const primary = document.querySelector('#primary-image');
    const main = `images/${product.slug}.svg`;
    const large = `images/${product.slug}-large.svg`;
    const crop = `images/${product.slug}-crop.svg`;
    primary.src = main;
    primary.alt = product.alt;
    primary.setAttribute('xoriginal', large);
    document.querySelector('#thumbs').innerHTML = `
    <a href="${large}" aria-label="Ảnh toàn cảnh" aria-current="true"><img class="xzoom-gallery" src="${main}" xpreview="${main}" alt="Toàn cảnh"></a>
    <a href="${crop}" aria-label="Ảnh cận cảnh" aria-current="false"><img class="xzoom-gallery" src="${crop}" xpreview="${crop}" alt="Cận cảnh"></a>`;
    $('.xzoom, .xzoom-gallery').xzoom({ position: 'inside', zoomWidth: 360, title: false, tint: '#142b24' });
    $('#thumbs a').on('click', function (event) {
        event.preventDefault();
        $('#thumbs a').attr('aria-current', 'false');
        $(this).attr('aria-current', 'true');
    });
    document.querySelector('#large-image').addEventListener('click', () => {
        document.querySelector('#zoom-dialog-image').src = document.querySelector('#thumbs [aria-current="true"]').href;
    });
}

function installReviews(product) {
    const key = `review:${product.slug}`;
    const reviews = document.querySelector('#reviews');
    let own = load(key, null);
    if (own && (typeof own.text !== 'string' || !Number.isInteger(own.score) || own.score < 1 || own.score > 5)) own = null;
    function showReview() {
        reviews.replaceChildren();
        const text = document.createElement('p');
        text.textContent = own ? `Đánh giá lưu trên máy này (${own.score}/5) · ${own.text}` : 'Chưa có đánh giá lưu trên trình duyệt này.';
        reviews.append(text);
    }
    showReview();
    $('#review-score').rating({ ...ratingOptions, step: 1 });
    document.querySelector('#review-form').addEventListener('submit', event => {
        event.preventDefault();
        const score = Number($('#review-score').val());
        const text = document.querySelector('#review-text').value.trim();
        const status = document.querySelector('#review-status');
        if (!Number.isInteger(score) || score < 1 || score > 5 || !text || text.length > 300) {
            status.textContent = 'Chọn số sao từ 1 đến 5 và nhập nhận xét tối đa 300 ký tự.';
            return;
        }
        const review = { score, text };
        if (!save(key, review)) {
            status.textContent = 'Trình duyệt không lưu được đánh giá. Vui lòng thử lại.';
            return;
        }
        own = review;
        showReview();
        status.textContent = 'Đã lưu đánh giá.';
    });
}

const detail = document.querySelector('#detail');
const currentProduct = detail ? productById.get(new URLSearchParams(location.search).get('p')) : null;
if (detail && !currentProduct) document.querySelector('#missing').hidden = false;
if (currentProduct) {
    const product = currentProduct;
    detail.hidden = false;
    document.querySelector('#product-name').textContent = product.name;
    document.querySelector('#product-category').textContent = product.label;
    document.querySelector('#description').textContent = product.description;
    document.querySelector('#product-price').innerHTML = priceMarkup(product);
    document.querySelector('#detail-rating').innerHTML = `<input data-product-rating type="number" value="${product.rating}" aria-label="${product.rating} trên 5 sao">`;
    document.querySelector('#related').innerHTML = catalog.filter(item => item !== product).map(card).join('');
    renderRatings(detail);
    renderDetailStock(product);
    installGallery(product);
    installReviews(product);
    document.querySelector('#add-form').addEventListener('submit', event => {
        event.preventDefault();
        const qty = document.querySelector('#quantity').valueAsNumber;
        const variant = document.querySelector('#variant').value;
        const status = document.querySelector('#add-status');
        const inCart = cart.filter(line => line.id === product.slug).reduce((n, line) => n + line.qty, 0);
        if (!variants.includes(variant) || !Number.isInteger(qty) || qty < 1 || qty + inCart > inventory(product)) {
            status.textContent = 'Số lượng thêm vào vượt mức hàng còn lại hoặc chưa hợp lệ.';
            return;
        }
        const existing = cart.find(line => line.id === product.slug && line.variant === variant);
        if (existing) existing.qty += qty;
        else cart.push({ id: product.slug, variant, qty });
        updateCart();
        status.textContent = `Đã thêm ${qty} sản phẩm vào giỏ.`;
    });
}
renderCatalog();
renderCart();
