document.addEventListener('DOMContentLoaded', function() {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const closeSidebarBtn = document.getElementById('closeSidebar');
  const sidebar = document.getElementById('sidebar');
  const cartBadge = document.getElementById('cart-badge');
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  const alertContainer = document.getElementById('alert-container');
  const cartTableBody = document.querySelector('#cart-table tbody');
  const totalPriceElement = document.getElementById('total-price');
  const checkoutButton = document.getElementById('checkout');
  const cart = document.getElementById('cart');
  const headerAddToCart = document.querySelector('.header-content .cart-icon i');
  const closeCartBtn = document.getElementById('closeCart');
  let cartCount = 0;
  let totalPrice = 0;
  let cartItems = [];

  sidebarToggle.addEventListener('click', toggleSidebar);
  closeSidebarBtn.addEventListener('click', closeSidebar);
  checkoutButton.addEventListener('click', checkout);
  headerAddToCart.addEventListener('click', showCart);

  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });

  closeCartBtn.addEventListener('click', closeCart);

  function toggleSidebar() {
    sidebar.classList.toggle('open');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
  }

  function addToCart(event) {
    const button = event.target;
    const productName = button.closest('.product-card').querySelector('h3').textContent;
    const productPrice = parseFloat(button.closest('.product-card').querySelector('.price').textContent.split(' ')[1]);

    const product = { name: productName, price: productPrice };

    cartItems.push(product);
    cartCount++;
    totalPrice += productPrice;

    cartBadge.textContent = cartCount;
    updateCartTable();
    showAlert('A product has been added successfully to the cart');
    saveCartItems();
  }

  function updateCartTable() {
    cartTableBody.innerHTML = '';

    cartItems.forEach((item, index) => {
      const row = document.createElement('tr');

      const nameCell = document.createElement('td');
      nameCell.textContent = item.name;
      row.appendChild(nameCell);

      const priceCell = document.createElement('td');
      priceCell.textContent = `Ksh ${item.price}`;
      row.appendChild(priceCell);

      const actionCell = document.createElement('td');
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => removeFromCart(index));
      actionCell.appendChild(removeButton);
      row.appendChild(actionCell);

      cartTableBody.appendChild(row);
    });

    totalPriceElement.textContent = `Ksh ${totalPrice}`;
  }

  function removeFromCart(index) {
    if (index !== -1) {
      const item = cartItems[index];
      cartItems.splice(index, 1);
      cartCount--;
      totalPrice -= item.price;

      cartBadge.textContent = cartCount;
      updateCartTable();
      showAlert('Product has been removed from the cart');
      saveCartItems();
    }
  }

  //function checkout() {
    //window.location.href = '{% url "process_checkout" %}';  }

  function showAlert(message) {
    alertContainer.textContent = message;
    alertContainer.style.display = 'block';
    setTimeout(() => {
      alertContainer.style.display = 'none';
    }, 2000);
  }

  function showCart() {
    cart.style.display = 'block';
  }

  function closeCart() {
    cart.style.display = 'none';
  }

  function saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  function loadCartItems() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      cartItems = JSON.parse(savedCartItems);
      cartCount = cartItems.length;
      totalPrice = calculateTotalPrice();
      cartBadge.textContent = cartCount;
      updateCartTable();
    }
  }

  function calculateTotalPrice() {
    return cartItems.reduce((total, item) => total + item.price, 0);
  }

  // Load cart items from localStorage when the page loads
  loadCartItems();

  // Save cart items to localStorage on window unload
  window.addEventListener('unload', saveCartItems);
});
