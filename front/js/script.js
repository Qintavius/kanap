fetch('http://localhost:3000/api/products')
    .then((resolve) => 
        resolve.json())
    .then((data) => {
        productsData(data);
    })
    .catch((error) => {
        const errorCatch = document.querySelector('.titles h2');
        errorCatch.innerHTML = 'Nous sommes désolés, nous ne pouvons pas afficher nos articles.<br>Essayez d\'actualiser la page.';
        console.log('Message d\'erreur: ' + error);
});

function productsData(items) {
    let productsDisplay = document.getElementById('items');
    for (let item of items) {
        productsDisplay.innerHTML += `
        <a href="./product.html?id=${item._id}">
        <article>
          <img src="${item.imageUrl}" alt="${item.altTxt}">
          <h3 class="productName">${item.name}</h3>
          <p class="productDescription">${item.description}</p>
        </article>
      </a>`;
    }
};