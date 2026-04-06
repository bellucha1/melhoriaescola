const products = [
  { name: "Detector de Circuito 1", price: 199.99, img: "detector1.jpg" },
  { name: "Detector de Circuito 2", price: 249.99, img: "detector2.jpg" },
  { name: "Detector de Circuito 3", price: 179.99, img: "detector3.jpg" },
  { name: "Detector de Circuito 4", price: 299.99, img: "detector4.jpg" }
];

const productsContainer = document.querySelector('.products-container');
const cartCount = document.querySelector('nav ul li a[href="cart.html"]');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Função para atualizar o carrinho no cabeçalho
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = `Carrinho (${totalItems})`;
}

// Função para criar cards de produtos
function displayProducts(filteredProducts) {
  productsContainer.innerHTML = '';
  filteredProducts.forEach((product, index) => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>R$ ${product.price.toFixed(2)}</p>
      <button class="add-to-cart" data-index="${index}">Adicionar ao Carrinho</button>
    `;
    productsContainer.appendChild(card);
  });

  attachAddToCartEvents();
}

// Adicionar eventos aos botões "Adicionar ao Carrinho"
function attachAddToCartEvents() {
  const buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const index = button.dataset.index;
      const product = products[index];
      const existingItem = cart.find(item => item.name === product.name);
      if (existingItem) existingItem.quantity += 1;
      else cart.push({ ...product, quantity: 1 });

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      alert(`${product.name} adicionado ao carrinho!`);
    });
  });
}

// Filtro e Busca
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');

function filterProducts() {
  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  const filterValue = parseFloat(filterSelect.value);
  if (!isNaN(filterValue)) {
    filtered = filtered.filter(p => p.price <= filterValue);
  }

  displayProducts(filtered);
}

searchInput.addEventListener('input', filterProducts);
filterSelect.addEventListener('change', filterProducts);

// Inicializa
displayProducts(products);
updateCartCount();
