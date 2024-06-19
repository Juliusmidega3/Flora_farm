// index.js

document.addEventListener('DOMContentLoaded', function() {
  // Sidebar
  const sidebarToggle = document.getElementById('sidebarToggle');
  const closeSidebarBtn = document.getElementById('closeSidebar');
  const sidebar = document.getElementById('sidebar');

  sidebarToggle.addEventListener('click', toggleSidebar);
  closeSidebarBtn.addEventListener('click', toggleSidebar);

  function toggleSidebar() {
    sidebar.classList.toggle('open');
  }

  // Cart
  const cartIcon = document.getElementById('cartIcon');
  const cart = document.getElementById('cart');
  const closeCartBtn = document.getElementById('closeCart');
  const cartTableBody = document.querySelector('#cart-table tbody');

  cartIcon.addEventListener('click', toggleCart);
  closeCartBtn.addEventListener('click', toggleCart);

  function toggleCart() {
    cart.classList.toggle('open');
  }

  // Add to Cart
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  const cartBadge = document.getElementById('cartBadge');
  let cartItems = [];

  

  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });

  function addToCart(event) {
    event.preventDefault();

    const button = event.target;
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = parseFloat(productCard.querySelector('.price').textContent.split(' ')[1]);

    const existingItem = cartItems.find(item => item.name === productName);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem = { name: productName, price: productPrice, quantity: 1 };
      cartItems.push(newItem);
    }

    updateCartBadge();
    updateCartTable();

    showAlert('Product has been added successfully to the cart');
  }

  function updateCartBadge() {
    cartBadge.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  function updateCartTable() {
    cartTableBody.innerHTML = '';

    cartItems.forEach(item => {
      const row = document.createElement('tr');

      const nameCell = document.createElement('td');
      nameCell.textContent = `${item.name} x${item.quantity}`;
      row.appendChild(nameCell);

      const quantityCell = document.createElement('td');
      quantityCell.textContent = item.quantity;
      row.appendChild(quantityCell);

      const priceCell = document.createElement('td');
      priceCell.textContent = `Ksh ${item.price * item.quantity}`;
      row.appendChild(priceCell);

      const actionCell = document.createElement('td');
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove-from-cart-btn');
      removeButton.addEventListener('click', () => removeFromCart(item.name));
      actionCell.appendChild(removeButton);
      row.appendChild(actionCell);

      cartTableBody.appendChild(row);
    });

    updateTotalPrice();
  }

  function removeFromCart(productName) {
    const index = cartItems.findIndex(item => item.name === productName);
    if (index > -1) {
      cartItems[index].quantity--;
      if (cartItems[index].quantity === 0) {
        cartItems.splice(index, 1);
      }
    }

    updateCartBadge();
    updateCartTable();

    showAlert('Product has been removed from the cart');
  }

  function updateTotalPrice() {
    const totalPriceElement = document.getElementById('total-price');
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    totalPriceElement.textContent = `Ksh ${totalPrice}`;
  }

  function showAlert(message) {
    const alertContainer = document.createElement('div');
    alertContainer.classList.add('alert-container');
    alertContainer.textContent = message;
    document.body.appendChild(alertContainer);

    setTimeout(() => {
      alertContainer.remove();
    }, 2000);
  }

});
