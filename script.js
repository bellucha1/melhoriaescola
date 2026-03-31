// Função para adicionar itens ao carrinho
let cart = [];

function updateCartDisplay() {
  const cartLink = document.querySelector('a[href="cart.html"]');
  cartLink.textContent = `Carrinho (${cart.length})`;
}

// Adiciona um produto ao carrinho
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const product = this.getAttribute('data-product');
    const price = parseFloat(this.getAttribute('data-price'));

    cart.push({ product, price });
    localStorage.setItem('cart', JSON.stringify(cart));  // Armazenando no LocalStorage
    updateCartDisplay();
  });
});

// Carrega o carrinho da sessão ao carregar a página
window.addEventListener('load', function() {
  const savedCart = JSON.parse(localStorage.getItem('cart'));
  if (savedCart) {
    cart = savedCart;
    updateCartDisplay();
  }
});
