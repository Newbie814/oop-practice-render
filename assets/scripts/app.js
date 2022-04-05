const productList = {
  products: [
    {
      title: 'Trip to a Black Hole',
      imageUrl:
        'https://res.cloudinary.com/dylvkdabj/image/upload/v1648871780/website%20pics%20family/black_hole_banner_mpkvhc.jpg',
      price: '$100,000.73',
      description: 'A crushing experience.',
    },
    {
      title: 'Fan Ride with the Guardians of the Galaxy',
      imageUrl:
        'https://res.cloudinary.com/dylvkdabj/image/upload/v1646514283/website%20pics%20family/wp2647127-space-wallpaper-hd_irkddn.jpg',
      price: '$100,000,765.73',
      description: 'A side splitting adventure.',
    },
    {
      title: 'Mosey on down to Natchez, Mississippi',
      imageUrl:
        'https://res.cloudinary.com/dylvkdabj/image/upload/v1649113933/website%20pics%20family/27natchez1-jumbo_xcei5l.jpg',
      price: '$00.03',
      description: 'An ambien like affair',
    },
  ],
  render() {
    const renderHook = document.getElementById('app');
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    for (const product of this.products) {
      const prodEl = document.createElement('li');
      prodEl.className = 'product-item';
      prodEl.innerHTML = `
      <div>
        <img src="${product.imageUrl}" alt="${product.title}">
        <div class="product-item__content">
          <h2>${product.title}</h2>
          <h3>\$${product.price}</h3>
          <p>${product.description}</p>
          <button>Add to Cart</button>

         </div>
      </div>`;
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  },
};

productList.render();
