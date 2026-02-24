const products = [
    { id: 1, name: "Samsung Galaxy S25 Ultra", price: 760, img: "https://images.samsung.com/is/image/samsung/p6pim/levant/2401/gallery/levant-galaxy-s24-s928-sm-s928bztqmea-539305411" },
    { id: 2, name: "Samsung Galaxy Z Fold 7", price: 1399, img: "https://images.samsung.com/is/image/samsung/p6pim/levant/sm-f946blbdmea/gallery/levant-galaxy-z-fold5-f946-sm-f946blbdmea-537411234" },
    { id: 3, name: "Samsung Galaxy A56 5G", price: 235, img: "https://images.samsung.com/is/image/samsung/p6pim/levant/sm-a546ezkdmea/gallery/levant-galaxy-a54-5g-sm-a546-sm-a546ezkdmea-535919013" }
];

let cart = [];

function loadProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(p => `
        <div class="card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <span class="price">${p.price} JOD</span>
            <button class="add-btn" onclick="addToCart(${p.id})">إضافة للسلة</button>
        </div>
    `).join('');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const list = document.getElementById('cart-items');
    list.innerHTML = cart.map((item, i) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <span>${item.name}</span>
            <b>${item.price} JOD</b>
        </div>
    `).join('');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total').innerText = total;
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

function sendOrder() {
    if(cart.length === 0) return alert("السلة فارغة!");
    let text = "طلب شراء جديد من متجر عادل:%0A";
    cart.forEach(item => text += `- ${item.name} (${item.price} JOD)%0A`);
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    text += `%0A*المجموع: ${total} دينار أردني*`;
    window.open(`https://wa.me/962785166443?text=${text}`);
}

loadProducts();
