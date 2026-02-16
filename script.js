const products = [
    {
        id: 1,
        name: "Samsung Galaxy S25 Ultra",
        price: 950,
        img: "https://images.samsung.com/is/image/samsung/p6pim/levant/2501/gallery/levant-galaxy-s25-s938-sm-s938bztpmea-544520786"
    },
    {
        id: 2,
        name: "Samsung Galaxy Z Fold 6",
        price: 1250,
        img: "https://images.samsung.com/is/image/samsung/p6pim/levant/sm-f956fzkamea/gallery/levant-galaxy-z-fold6-f956-sm-f956fzkamea-542358327"
    },
    {
        id: 3,
        name: "Samsung Galaxy S24 Ultra",
        price: 780,
        img: "https://images.samsung.com/is/image/samsung/p6pim/levant/2401/gallery/levant-galaxy-s24-s928-sm-s928bztpmea-539327827"
    }
];

let cart = [];

// عرض المنتجات
const grid = document.getElementById('products-grid');
products.forEach(p => {
    grid.innerHTML += `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">${p.price} JOD</p>
            <button class="buy-btn" onclick="addToCart(${p.id})">أضف إلى السلة</button>
        </div>
    `;
});

function addToCart(id) {
    const p = products.find(item => item.id === id);
    cart.push(p);
    updateCart();
    toggleCart(); // يفتح السلة فوراً عند الإضافة
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    const itemsContainer = document.getElementById('cart-items');
    itemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        itemsContainer.innerHTML += `<div style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <span>${item.name}</span>
            <span>${item.price} JOD</span>
        </div>`;
    });
    document.getElementById('cart-total').innerText = total;
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

function checkout() {
    if(cart.length === 0) return alert("السلة فارغة!");
    let total = document.getElementById('cart-total').innerText;
    let msg = `طلب جديد من متجر عادل:%0Aالمجموع: ${total} JOD%0Aيرجى تأكيد الدفع عبر CliQ لاسم المستلم: AMER818`;
    window.open(`https://wa.me/962785166443?text=${msg}`, '_blank');
}

// بايبال
paypal.Buttons({
    createOrder: function(data, actions) {
        let totalUSD = (parseFloat(document.getElementById('cart-total').innerText) * 1.41).toFixed(2);
        return actions.order.create({ purchase_units: [{ amount: { value: totalUSD } }] });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(() => {
            alert('تم الدفع بنجاح! شكراً لثقتك بمتجر عادل.');
            cart = [];
            updateCart();
            toggleCart();
        });
    }
}).render('#paypal-button-container');
