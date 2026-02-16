
const products = [
    { id: 1, name: "Samsung Galaxy S25 Ultra", price: 760, img: "https://images.samsung.com/is/image/samsung/p6pim/levant/2501/gallery/levant-galaxy-s25-s938-sm-s938bztpmea-544520786" },
    { id: 2, name: "Samsung Galaxy Z Fold7", price: 1399, img: "https://via.placeholder.com/200?text=Fold7" },
    { id: 3, name: "Samsung Galaxy A56", price: 235, img: "https://via.placeholder.com/200?text=A56" }
];

let cart = [];

const productsContainer = document.getElementById('products');
products.forEach(product => {
    productsContainer.innerHTML += `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price} JOD</p>
            <button style="background:#000; color:#fff" onclick="addToCart(${product.id})">أضف للسلة</button>
        </div>`;
});

function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCart();
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    let total = 0;
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = "";
    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `<p>${item.name} - ${item.price} JOD</p>`;
    });
    document.getElementById('cart-total').innerText = total;
}

function toggleCart() { document.getElementById('cart-modal').classList.toggle('active'); }

function checkout() {
    if(cart.length === 0) return alert("السلة فارغة!");
    let items = cart.map(i => i.name).join(", ");
    let total = document.getElementById('cart-total').innerText;
    let msg = `طلب جديد:%0Aالأجهزة: ${items}%0Aالمجموع: ${total} JOD%0Aالدفع: CliQ (AMER818)`;
    window.open(`https://wa.me/962785166443?text=${msg}`, '_blank');
}

// تشغيل PayPal
paypal.Buttons({
    createOrder: function(data, actions) {
        let totalUSD = (parseFloat(document.getElementById('cart-total').innerText) * 1.41).toFixed(2);
        return actions.order.create({ purchase_units: [{ amount: { value: totalUSD } }] });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(() => { alert('تم الدفع بنجاح!'); checkout(); });
    }
}).render('#paypal-button-container');
