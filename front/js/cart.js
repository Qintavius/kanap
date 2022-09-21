let cart = JSON.parse(localStorage.getItem('cart'));
// console.log(cart);

let items = [];

let orderProduct = JSON.parse(localStorage.getItem('order'));

//-------------------------------------------------
// Fonction affichage produit
//-------------------------------------------------
function displayItem() {
  for(item of cart) {

    document.querySelector('#cart__items').innerHTML += `
        <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
            <div class="cart__item__img">
              <img src="${item.image}" alt="${item.imageTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${item.name}</h2>
                <p>${item.color}</p>
                <p>${item.price} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : ${item.quantity}</p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
        </article>`;

    items.push(item.id);
    // console.log(items);
  }
};
displayItem();

//-------------------------------------------------
// Lire le LS
//-------------------------------------------------
function getCart(){
  let cart = localStorage.getItem('cart');
  return JSON.parse(cart);
};

//-------------------------------------------------
// sauvegarde du nouveau panier
//-------------------------------------------------
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
};
// console.log(cart);

//-------------------------------------------------
// Fonction total quantitée
//-------------------------------------------------
displayTotalQuantity = (item) => {
  const totalQuantity = document.getElementById("totalQuantity")
  const total = cart.reduce((total, item) => total + item.quantity, 0)
  totalQuantity.textContent = total;
}
displayTotalQuantity(item);

//-------------------------------------------------
// Fonction total prix
//-------------------------------------------------
let total;

displayTotalPrice = () => {
  const totalPrice = document.getElementById("totalPrice")
  total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  totalPrice.textContent = total;
}
displayTotalPrice();
// console.log(total);

//-------------------------------------------------
// modif quantite produit
//-------------------------------------------------
let inputQuantity = Array.from(document.querySelectorAll('.itemQuantity'));
let currentQuantity = Array.from(document.querySelectorAll('.cart__item__content__settings__quantity p'));


inputQuantity.forEach(function (quantity, i) {
  quantity.addEventListener('input', () => {

    currentQuantity[i].innerHTML = "Qté : " + quantity.value;
    cart[i].quantity = Number(quantity.value);
    displayTotalQuantity()
    displayTotalPrice()
    saveCart();
  })
});

//-------------------------------------------------
// Supprimer produit
//-------------------------------------------------
let deleteButton = document.querySelectorAll('.deleteItem');

for(let i = 0; i < deleteButton.length; i++) {
  deleteButton[i].addEventListener('click', (event) => {
    event.preventDefault();
    console.log(deleteButton);

  let productInStorage = cart[i].id && cart[i].color; // var de condition de suppression
  console.log('resultat ' + productInStorage);

  cart = cart.filter( el => el.id !== productInStorage && el.color !== productInStorage)
  console.log(cart);

  displayTotalQuantity();
  displayTotalPrice();
  saveCart();
  alert('Le produit ' + `${item.name}` + ',' + ' couleur ' + `${item.color}` + ' à été supprimé');
  // Actualisation de la page pour afficher le panier sauvegardé
  window.location.reload()
  })
};

//-------------------------------------------------
// Formulaire
//-------------------------------------------------
let submitForm = document.getElementById('order');

// ***************** Variables champs formulaire ******************
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

// ***************** Regex conditions validation ******************
let textOnlyValidation = /^[a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+)?/;
let textNumValidation = /^[0-9]{1,3} [a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+)?/;
let cpValidation = /^[0-9]{3,5} [a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+)?/;
let emailValidation = /^[\w-\.]+@([\w-\.]+\.)+[\w-]{2,4}$/;

// ***************** Prenom ******************
firstName.addEventListener('input', function(e) {
  valueFirstName;
  if (e.target.value.length == 0) {
    errorFirstName.innerHTML = '';
    valueFirstName = null;
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
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

  if (!e.target.value.match(textOnlyValidation) && e.target.value.length > 3 && e.target.value.length < 25) {
    errorFirstName.innerHTML = 'Le champ ne doit pas contenir de caractères spéciaux sauf (- \')';
    valueFirstName = null;
    // console.log('erreur caractere speciaux');
  }
});

// ***************** Nom ******************
lastName.addEventListener('input', function(e) {
  valueLastName;
  if (e.target.value.length == 0) {
    errorLastName.innerHTML = '';
    valueLastName = null;
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
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

  if (!e.target.value.match(textOnlyValidation) && e.target.value.length > 3 && e.target.value.length < 25) {
    errorLastName.innerHTML = 'Le champ ne doit pas contenir de caractères spéciaux sauf (- \')';
    valueLastName = null;
    // console.log('erreur caractere speciaux');
  }
});

// ***************** Adresse ******************
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
    errorAddress.innerHTML = 'Renseignez d\'abord le numéro de la voie et peut contenir les caractères spéciaux (- \')';
    valueAdress = null;
    // console.log('erreur caractere speciaux');
  }
});

// ***************** Ville ******************
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
    errorCity.innerHTML = 'Renseignez d\'abord le code postal et peut contenir les caractères spéciaux (- \')';
    valueCity = null;
    // console.log('erreur caractere speciaux');
  }
});

// ***************** Email ******************
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

// ***************** Validation du formulaire ******************
let formular = document.getElementById('order');

formular.addEventListener('click', (e) => {
  e.preventDefault();
  // console.log("propagation stoppé");

  if (valueFirstName && valueLastName && valueAdress && valueCity && valueEmail) {
    // console.log("send ok");
    const finalOrder = JSON.parse(localStorage.getItem('cart'));
    let indent = [];
    console.log(finalOrder);
    console.log(indent);

    finalOrder.forEach((order) => {
      indent.push(order.id)
    });
    console.log(indent);

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

    console.log(orderData);

//-------------------------------------------------
// Requete Fetch post
//-------------------------------------------------
    fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((promise) => {
        let response = promise
        console.log(response);

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
    });

  } else {
    alert('Veuillez remplir le formulaire correctement');
  }
});

// console.log(orderProduct);