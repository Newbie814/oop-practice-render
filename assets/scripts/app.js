class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ElementAttribute {
  constructor(attributeName, attributeValue) {
    this.name = attributeName;
    this.value = attributeValue;
  }
}

class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attribute of attributes) {
        rootElement.setAttribute(attribute.name, attribute.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
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

  constructor(renderHookId) {
    super(renderHookId);
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
    console.log(updatedItems);
  }

  render() {
    const cartElement = this.createRootElement('section', 'cart');
    cartElement.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order</button>
      `;

    this.totalOutput = cartElement.querySelector('h2');
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId);
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const productElement = this.createRootElement('li', 'product-item');

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
  }
}

class ProductList extends Component {
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

  constructor(renderHookId) {
    super(renderHookId);
  }

  render() {
    this.createRootElement('ul', 'product-list', [
      new ElementAttribute('id', 'prod-list'),
    ]);

    for (const product of this.products) {
      const productItem = new ProductItem(product, 'prod-list');
      productItem.render();
    }
  }
}

class Shop {
  render() {
    this.cart = new ShoppingCart('app');
    this.cart.render();
    const productList = new ProductList('app');
    productList.render();
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
