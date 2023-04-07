const pizzasContainer = document.querySelector('.pizzas-container');

fetch('http://localhost:3000/pizzas')
  .then(response => response.json())
  .then(data => {
    const pizzas = data; // changed from data.pizzas to data, assuming the response data is an array of pizzas
    pizzas.forEach(pizza => { // changed pizza to pizzas, to match the name of the array
      const pizzaCard = document.createElement('div');
      pizzaCard.classList.add('pizza-card');
      pizzaCard.innerHTML = `
        <img src="${pizza.image}"> <!-- changed pizzas to pizza, to access the property of the current pizza -->
        <h2>${pizza.name}</h2>
        <p>${pizza.ingredients}</p>
        <p>$${pizza.price}</p> <!-- removed a duplicate price field -->
        <button>Add to Cart</button>
      `;
      pizzasContainer.appendChild(pizzaCard);
    });
  });
  