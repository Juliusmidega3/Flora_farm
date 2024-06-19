document.addEventListener('DOMContentLoaded', function () {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const cartIcon = document.querySelector('.cart-icon');
    const cart = document.getElementById('cart');
    const closeCart = document.getElementById('closeCart');

    sidebarToggle.addEventListener('click', function () {
        sidebar.classList.toggle('active');
    });

    closeSidebar.addEventListener('click', function () {
        sidebar.classList.remove('active');
    });

    cartIcon.addEventListener('click', function () {
        cart.style.display = 'block';
    });

    closeCart.addEventListener('click', function () {
        cart.style.display = 'none';
    });

    // Handle outside click to close sidebar and cart
    document.addEventListener('click', function (event) {
        if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
            sidebar.classList.remove('active');
        }
        if (!cart.contains(event.target) && !cartIcon.contains(event.target)) {
            cart.style.display = 'none';
        }
    });
});
