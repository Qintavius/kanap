let cart = JSON.parse(localStorage.getItem('cart'));
// console.log(cart);

// Stock les elements du LS dans un tableau
let items = [];

// Variable parent de l'élément article
let injectArticle;

//-------------------------------------------------
// Fonction initialisation des fonctions pour affichage
//-------------------------------------------------
function displayCart() {
  const cart = getCart();
  displayItem(cart);
  deleteItem(cart);
  displayTotalQuantity();
  checkCart();
};

displayCart();

//-------------------------------------------------
// Fonction affichage produit
//-------------------------------------------------
function displayItem(cart) {
  for(let item of cart) {
    fetch(`http://localhost:3000/api/products/${item.id}`)
    .then((data) => data.json())
    .then((product) => {

      injectArticle = document.getElementById('cart__items');

      let article = document.createElement('article');
      injectArticle.appendChild(article);
      article.classList.add('cart__item');
      article.setAttribute('data-id', `${item.id}`);
      article.setAttribute('data-color', `${item.color}`);
      article.innerHTML = `
            <div class="cart__item__img">
              <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${item.color}</p>
                <p>${product.price} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
        </article>`;

    // console.log(items);
    displayTotalQuantity();
    displayTotalPrice();
    changeQuantity(product, cart);
    deleteItem(product);
    checkCart();
    })
    .catch((error) => {
      console.log('Message d\'erreur: ' + error);
    });
  }
};
//-------------------------------------------------
// Lire le LS
//-------------------------------------------------
function getCart() {
  let cart = localStorage.getItem('cart');
  return JSON.parse(cart);
};

//-------------------------------------------------
// sauvegarde du nouveau panier
//-------------------------------------------------
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
};
// console.log(cart);

//-------------------------------------------------
// Controle du panier
//-------------------------------------------------
function checkCart() {
  const cart = getCart();
  if(cart.length == 0){
    injectArticle = document.getElementById('cart__items');

      let article = document.createElement('article');
      injectArticle.appendChild(article);
      article.classList.add('cart__item');
      article.innerHTML = 'Votre panier est vide.'

    return true;
  };
};

//-------------------------------------------------
// Fonction total quantitée
//-------------------------------------------------
function displayTotalQuantity() {
  let product = getCart();
  let total = 0;
  for (const item of product) {
    total += Number(item.quantity);
  };
  const totalQuantity = document.querySelector("#totalQuantity");
  totalQuantity.textContent = total;
  saveCart(product);
};

//-------------------------------------------------
// Fonction total prix
//-------------------------------------------------
function displayTotalPrice() {
  let product = getCart();
  let productsQuantity = document.querySelectorAll(".itemQuantity");
  // console.log(productsQuantity);
  let productsPrice = document.querySelectorAll(".cart__item__content__description");
  // console.log(productsPrice);
  let total = 0;
  for(i = 0; i < productsPrice.length; i++) {
    total += parseInt(productsPrice[i].lastElementChild.textContent) * productsQuantity[i].value;
  };
  document.getElementById('totalPrice').textContent = total;
  saveCart(product);
};


//-------------------------------------------------
// modif quantite produit
//-------------------------------------------------
// "Element.closest" https://developer.mozilla.org/fr/docs/Web/API/Element/closest

function changeQuantity() {
  let product = getCart();
  let inputQuantity = document.querySelectorAll('.itemQuantity');

  inputQuantity.forEach(function (item) {
    item.addEventListener('input', (e) => {
      const itemId = e.target.closest('.cart__item').dataset.id;
      const itemColor = e.target.closest('.cart__item').dataset.color;

      let productFind = product.find(function (item) {
        return item.id == itemId && item.color == itemColor;
      });
      productFind.quantity = parseInt(e.target.value);
      saveCart(product);
      displayTotalQuantity();
      displayTotalPrice();
    });
  });
};

//-------------------------------------------------
// Supprimer produit
//-------------------------------------------------
function deleteItem(product) {
  let deleteButton = document.querySelectorAll('.deleteItem');

  deleteButton.forEach(function(btn) {
    btn.addEventListener('click', (event) => {
      event.preventDefault();

      const itemId = event.target.closest('.cart__item').dataset.id;
      const itemColor = event.target.closest('.cart__item').dataset.color;
      const itemDel = event.target.closest('.cart__item');
      let product = getCart();
      product = product.filter(function(item) {
        return item.id != itemId || item.color != itemColor;
      });
      itemDel.remove();
      saveCart(product);
      displayTotalQuantity();
      displayTotalPrice();
      checkCart();
    });
  });
};

//-------------------------------------------------
// Formulaire
//-------------------------------------------------
// Commande final
let orderProduct = JSON.parse(localStorage.getItem('order'));

let submitForm = document.getElementById('order'); // Bouton commander

// ***************** Variables champs formulaire *****************
let firstName = document.getElementById('firstName');
let errorFirstName = document.getElementById('firstNameErrorMsg');


let lastName = document.getElementById('lastName');
let errorLastName = document.getElementById('lastNameErrorMsg');


let address = document.getElementById('address');
let errorAddress = document.getElementById('addressErrorMsg');


let city = document.getElementById('city');
let errorCity = document.getElementById('cityErrorMsg');


let email = document.getElementById('email');
let errorEmail = document.getElementById('emailErrorMsg');

let valueFirstName, valueLastName, valueAdress, valueCity, valueEmail;

// ***************** Regex conditions validation *****************
let textOnlyValidation = /^[a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+)?/;
let textNumValidation = /^[0-9]{1,3} [a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+)?/;
let cpValidation = /^[0-9]{3,5} [a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+)?/;
let emailValidation = /^[\w-\.]+@([\w-\.]+\.)+[\w-]{2,4}$/;

// ***************** Prenom *****************
firstName.addEventListener('input', function(e) {
  valueFirstName;
  if (e.target.value.length == 0) {
    errorFirstName.innerHTML = '';
    valueFirstName = null;
  } else if (e.target.value.length < 2 || e.target.value.length > 25) {
    // console.log(errorFirstName);
    errorFirstName.innerHTML = "Le champ doit contenir entre 2 et 25 caractères";
    valueFirstName = null;
    // console.log('Erreur nombre caractere');
  }

  if (e.target.value.match(textOnlyValidation)) {
    errorFirstName.innerHTML = '';
    valueFirstName = e.target.value;
    // console.log("OK");
    // console.log(valueFirstName);
  }

  if (!e.target.value.match(textOnlyValidation) && e.target.value.length > 2 && e.target.value.length < 25) {
    errorFirstName.innerHTML = 'Les caractères spéciaux acceptés sont (- \')';
    valueFirstName = null;
    // console.log('erreur caractere speciaux');
  }
});

// ***************** Nom *****************
lastName.addEventListener('input', function(e) {
  valueLastName;
  if (e.target.value.length == 0) {
    errorLastName.innerHTML = '';
    valueLastName = null;
  } else if (e.target.value.length < 2 || e.target.value.length > 25) {
    // console.log(errorLastName);
    errorLastName.innerHTML = "Le champ doit contenir entre 2 et 25 caractères";
    valueLastName = null;
    // console.log('Erreur nombre caractere');
  }

  if (e.target.value.match(textOnlyValidation)) {
    errorLastName.innerHTML = '';
    valueLastName = e.target.value;
    // console.log("OK");
    // console.log(valueLastName);
  }

  if (!e.target.value.match(textOnlyValidation) && e.target.value.length > 2 && e.target.value.length < 25) {
    errorLastName.innerHTML = 'Les caractères spéciaux acceptés sont (- \')';
    valueLastName = null;
    // console.log('erreur caractere speciaux');
  }
});

// ***************** Adresse *****************
address.addEventListener('input', function(e) {
  valueAdress;
  if (e.target.value.length == 0) {
    errorAddress.innerHTML = '';
    valueAdress = null;
  } else if (e.target.value.length < 3 || e.target.value.length > 35) {
    // console.log(errorAddress);
    errorAddress.innerHTML = "Le champ doit contenir entre 3 et 35 caractères";
    valueAdress = null;
    // console.log('Erreur nombre caractere');
  }

  if (e.target.value.match(textNumValidation)) {
    errorAddress.innerHTML = '';
    valueAdress = e.target.value;
    // console.log("OK");
    // console.log(valueAdress);
  }

  if (!e.target.value.match(textNumValidation) && e.target.value.length > 3 && e.target.value.length < 35) {
    errorAddress.innerHTML = 'Renseignez d\'abord le numéro de la voie, peut contenir les caractères spéciaux (- \')';
    valueAdress = null;
    // console.log('erreur caractere speciaux');
  }
});

// ***************** Ville *****************
city.addEventListener('input', function(e) {
  valueCity;
  if (e.target.value.length == 0) {
    errorCity.innerHTML = '';
    valueCity = null;
  } else if (e.target.value.length < 3 || e.target.value.length > 35) {
    // console.log(errorCity);
    errorCity.innerHTML = "Le champ doit contenir entre 3 et 35 caractères";
    valueCity = null;
    // console.log('Erreur nombre caractere');
  }

  if (e.target.value.match(cpValidation)) {
    errorCity.innerHTML = '';
    valueCity = e.target.value;
    // console.log("OK");
    // console.log(valueCity);
  }

  if (!e.target.value.match(cpValidation) && e.target.value.length > 3 && e.target.value.length < 35) {
    errorCity.innerHTML = 'Renseignez d\'abord le code postal, peut contenir les caractères spéciaux (- \')';
    valueCity = null;
    // console.log('erreur caractere speciaux');
  }
});

// ***************** Email *****************
email.addEventListener('input', function(e) {
  valueEmail;
  if (e.target.value.length == 0) {
    errorEmail.innerHTML = '';
    valueEmail = null;
  } else if (e.target.value.match(emailValidation)) {
    errorEmail.innerHTML = '';
    valueEmail = e.target.value;
    // console.log("OK");
    // console.log(valueEmail);
  }

  if (!e.target.value.match(emailValidation) && !e.target.value.length == 0) {
    errorEmail.innerHTML = 'Format Email incorrect (exemple format accepté: votre@email.fr)';
    valueEmail = null;
  }
});

// ***************** Validation du formulaire *****************
let formular = document.getElementById('order');

let total;

formular.addEventListener('click', (e) => {
  e.preventDefault();
  // console.log("propagation stoppé");

  if (valueFirstName && valueLastName && valueAdress && valueCity && valueEmail) {
    // console.log("send ok");
    const finalOrder = JSON.parse(localStorage.getItem('cart'));
    let indent = [];
    // console.log(finalOrder);
    console.log(indent);

    finalOrder.forEach((order) => {
      indent.push(order.id)
    });
    // console.log(indent);

    const orderData = {
      contact: {
        firstName: valueFirstName,
        lastName: valueLastName,
        address: valueAdress,
        city: valueCity,
        email: valueEmail 
      },
      products: indent
    };

    // console.log(orderData);

//-------------------------------------------------
// Requete Fetch POST
//-------------------------------------------------
    fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((promise) => {
        let response = promise
        // console.log(response);

      const dataOrder = {
        contact: response.contact,
        order: response.orderId,
        total: total,
      }

      if (orderProduct == null) {
        orderProduct = [];
        orderProduct.push(dataOrder)
        sessionStorage.setItem('orders', JSON.stringify(orderProduct));
      } else if (orderProduct =! null) {
        orderProduct.push(dataOrder);
        sessionStorage.setItem('orders', JSON.stringify(orderProduct));
      }
      localStorage.removeItem('cart');
      location.href = 'confirmation.html';
    })
    .catch((error) => {
      console.log('Message d\'erreur: ' + error);
    });

  } else {
    alert('Veuillez renseigner le formulaire correctement');
  }
});

// console.log(orderProduct);