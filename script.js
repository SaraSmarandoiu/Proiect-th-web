const cartKey = "shoppingCart";

function getCart() {
    return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function saveCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

function addToCart(product) {
    const cart = getCart();
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    displayCartItems();
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cart = getCart();

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Coșul tău este gol.</p>";
        return;
    }

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Preț: ${item.price} RON</p>
                <p>Cantitate: ${item.quantity}</p>
                <p>Total: ${itemTotal} RON</p>
                <button class="remove-from-cart" data-id="${item.id}">Elimină</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.querySelectorAll(".remove-from-cart").forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.dataset.id;
            removeFromCart(productId);
        });
    });

    document.getElementById("cart-total").textContent = `${total} RON`;
}

function handleLogout() {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "login.html";
}

if (document.querySelector("#featured-products")) {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const productElement = button.closest(".product");
            const product = {
                id: button.dataset.id,
                name: productElement.querySelector("h4").textContent.trim(),
                price: parseFloat(productElement.querySelector("p").textContent.replace("Preț: ", "").replace(" RON", "")),
                image: productElement.querySelector("img").src
            };
            addToCart(product);
        });
    });
}

if (document.querySelector("#cart")) {
    displayCartItems();
}

if (document.querySelector("#logout-button")) {
    document.getElementById("logout-button").addEventListener("click", handleLogout);
}
