// Recupera o carrinho do localStorage ou cria vazio
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Elementos do DOM
const cartContainer = document.getElementById('cart-items');
const totalValueEl = document.getElementById('total-value');
const checkoutBtn = document.getElementById('checkout-button');

// Função para exibir o carrinho
function displayCart() {
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
    totalValueEl.textContent = '0.00';
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <p><strong>${item.product}</strong></p>
      <p>Preço: R$ ${item.price.toFixed(2)}</p>
      <p>
        Quantidade:
        <button class="decrease" data-index="${index}">-</button>
        ${item.quantity || 1}
        <button class="increase" data-index="${index}">+</button>
      </p>
      <button class="remove" data-index="${index}">Remover</button>
      <hr>
    `;
    cartContainer.appendChild(div);
  });

  updateTotal();
  attachCartEvents();
}

// Atualiza o total do carrinho
function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  totalValueEl.textContent = total.toFixed(2);
}

// Adiciona eventos de aumentar, diminuir e remover
function attachCartEvents() {
  const increaseBtns = document.querySelectorAll('.increase');
  const decreaseBtns = document.querySelectorAll('.decrease');
  const removeBtns = document.querySelectorAll('.remove');

  increaseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      if (!cart[index].quantity) cart[index].quantity = 1;
      cart[index].quantity += 1;
      saveCart();
      displayCart();
    });
  });

  decreaseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      if (!cart[index].quantity) cart[index].quantity = 1;
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      saveCart();
      displayCart();
    });
  });

  removeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      cart.splice(index, 1);
      saveCart();
      displayCart();
    });
  });
}

// Salva o carrinho no localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Botão de finalizar compra
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  alert("Compra finalizada com sucesso!");
  cart = [];
  saveCart();
  displayCart();
});

// Inicializa o carrinho na tela
displayCart();
