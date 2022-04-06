class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ShoppingCart {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalPrice.toFixed(
      2
    )}</h2>`;
    // console.log(this.totalPrice);
  }

  get totalPrice() {
    const sum = this.items.reduce(
      (previousValue, CurrentItem) => previousValue + CurrentItem.price,
      0
    );
    // console.log(sum);
    return sum;
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
    console.log(updatedItems);
  }

  render() {
    const cartElement = document.createElement('section');
    cartElement.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order</button>
      `;
    cartElement.className = 'cart';
    this.totalOutput = cartElement.querySelector('h2');
    return cartElement;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const productElement = document.createElement('li');
    productElement.className = 'product-item';
    productElement.innerHTML = `
      <div>
        <img src="${this.product.imageUrl}" alt="${this.product.title}">
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button>Add to Cart</button>
         </div>
      </div>`;
    const addToCartBtn = productElement.querySelector('button');
    addToCartBtn.addEventListener('click', this.addToCart.bind(this));
    return productElement;
  }
}

class ProductList {
  products = [
    new Product(
      'Trip to a Black Hole',
      'https://res.cloudinary.com/dylvkdabj/image/upload/v1648871780/website%20pics%20family/black_hole_banner_mpkvhc.jpg',
      'A crushing experience.',
      100000.73
    ),
    new Product(
      'Fan Ride with the Guardians of the Galaxy',
      'https://res.cloudinary.com/dylvkdabj/image/upload/v1646514283/website%20pics%20family/wp2647127-space-wallpaper-hd_irkddn.jpg',
      'A side splitting adventure.',
      105943001.65
    ),
    new Product(
      'Mosey on down to Natchez, Mississippi',
      'https://res.cloudinary.com/dylvkdabj/image/upload/v1649113933/website%20pics%20family/27natchez1-jumbo_xcei5l.jpg',
      'An ambien-like affair',
      0.03
    ),
  ];
  render() {
    const productList = document.createElement('ul');
    productList.className = 'product-list';
    for (const product of this.products) {
      const productItem = new ProductItem(product);
      const productElement = productItem.render();
      productList.append(productElement);
    }
    return productList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById('app');
    this.cart = new ShoppingCart();
    const cartElement = this.cart.render();

    const productList = new ProductList();
    const productListElement = productList.render();

    renderHook.append(cartElement);
    renderHook.append(productListElement);
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();

// const productList = new ProductList();
// productList.render();

// const shop = new Shop();
// shop.render();
