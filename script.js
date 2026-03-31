// Função para adicionar itens ao carrinho
let cart = [];

// Função para atualizar o número de itens no carrinho
function updateCartDisplay() {
  const cartLink = document.querySelector('a[href="cart.html"]');
  cartLink.textContent = `Carrinho (${cart.length})`;
}

// Adiciona um produto ao carrinho
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const product = this.getAttribute('data-product');
    const price = parseFloat(this.getAttribute('data-price'));

    // Verifica se o produto já está no carrinho
    const existingProduct = cart.find(item => item.product === product);
    if (existingProduct) {
      existingProduct.quantity += 1;  // Aumenta a quantidade do produto
    } else {
      cart.push({ product, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));  // Armazenando no LocalStorage
    updateCartDisplay();  // Atualiza o carrinho na interface
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
