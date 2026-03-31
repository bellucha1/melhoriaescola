// Função para carregar o carrinho do localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Função para atualizar a quantidade de itens no carrinho no cabeçalho
function updateCartDisplay() {
  const cartLink = document.querySelector('a[href="cart.html"]');
  cartLink.textContent = `Carrinho (${cart.length})`;
}

// Adiciona um produto ao carrinho
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const productName = this.getAttribute('data-product');
    const productPrice = parseFloat(this.getAttribute('data-price'));

    // Verifica se o produto já está no carrinho
    const existingProduct = cart.find(item => item.product === productName);
    if (existingProduct) {
      existingProduct.quantity += 1;  // Aumenta a quantidade do produto
    } else {
      cart.push({ product: productName, price: productPrice, quantity: 1 });
    }

    // Salva o carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza a exibição do carrinho
    updateCartDisplay();
  });
});

// Carrega o carrinho ao carregar a página
window.addEventListener('load', function() {
  updateCartDisplay();
});
