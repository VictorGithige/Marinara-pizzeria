const pizzasContainer = document.querySelector('.pizzas-container');
const cart = []; // initialize an empty cart array

const updateCart = () => {
  const cartItemsContainer = document.querySelector('.cart-items-container');
  cartItemsContainer.innerHTML = ''; // clear the previous cart items

  let total = 0; // initialize the total price of the items

  // loop through the cart items and create an HTML element for each item
  cart.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price}</span>
      <button class="remove-item">x</button>
    `;

    total += item.price; // add the price of the item to the total
    cartItemsContainer.appendChild(cartItem); // add the item to the cart items container

    // add an event listener to the "Remove" button of the item
    const removeButton = cartItem.querySelector('.remove-item');
    removeButton.addEventListener('click', () => {
      const index = cart.indexOf(item); // get the index of the item in the cart
      cart.splice(index, 1); // remove the item from the cart
      updateCart(); // update the cart display
    });
  });

  // update the total price display
  const totalPrice = document.querySelector('.total-price');
  totalPrice.textContent = `$${total.toFixed(2)}`;

  // update the cart count display
  const cartCount = document.querySelector('.cart-count');
  cartCount.textContent = cart.length;
};

// add an event listener to the cart icon to show/hide the cart dropdown menu
const cartIcon = document.querySelector('.cart-icon');
const cartDropdown = document.querySelector('.cart-dropdown');
cartIcon.addEventListener('click', () => {
  cartDropdown.classList.toggle('show');
});

// add an event listener to the checkout button to clear the cart
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.addEventListener('click', () => {
  cart.length = 0; // clear the cart
  updateCart(); // update the cart display
});

fetch('http://localhost:3000/pizzas')
  .then(response => response.json())
  .then(data => {
    const pizzas = data;
    pizzas.forEach(pizza => {
      const pizzaCard = document.createElement('div');
      pizzaCard.classList.add('pizza-card');
      pizzaCard.innerHTML = `
        <img src="${pizza.image}">
        <h2>${pizza.name}</h2>
        <p>${pizza.ingredients}</p>
        <p>$${pizza.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      `;
      pizzasContainer.appendChild(pizzaCard);

       // add a mouseover event listener to the pizza card that changes the background color
  pizzaCard.addEventListener('mouseover', () => {
    pizzaCard.style.backgroundColor = 'lightblue';
  });

  // add a mouseout event listener to the pizza card that changes the background color back
  pizzaCard.addEventListener('mouseout', () => {
    pizzaCard.style.backgroundColor = 'white';
  });

      // add an event listener to the "Add to Cart" button of the pizza
      const addToCartButton = pizzaCard.querySelector('.add-to-cart');
      addToCartButton.addEventListener('click', () => {
        const cartItem = {
          name: pizza.name,
          price: pizza.price
        };
        cart.push(cartItem); // add the item to the cart
        updateCart(); // update the cart display
      });
    });
    
  })