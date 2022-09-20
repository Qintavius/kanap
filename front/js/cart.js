let cart = JSON.parse(localStorage.getItem('cart'));
// console.log(cart);

let items = [];

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
}
displayItem();

//-------------------------------------------------
// Lire le LS
//-------------------------------------------------
function getCart(){
  let cart = localStorage.getItem('cart');
  return JSON.parse(cart);
}

//-------------------------------------------------
// sauvegarde du nouveau panier
//-------------------------------------------------
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
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
displayTotalPrice = () => {
  const totalPrice = document.getElementById("totalPrice")
  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  totalPrice.textContent = total;
}
displayTotalPrice();

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
})

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
}

//-------------------------------------------------
// Formulaire
//-------------------------------------------------
let submitForm = document.getElementById('order');

// ***************** Validation ******************
let firstName = document.getElementById('firstName');
let errorFirstName = document.getElementById('firstNameErrorMsg');
let firstNameValidation = /^[a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+)?/;

let lastName = document.getElementById('lastName');
let errorLastName = document.getElementById('lastNameErrorMsg');
let lastNameValidation = /^[a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+)?/;

let address = document.getElementById('lastName');
let errorAddress = document.getElementById('addressErrorMsg');
let adressValidation = /^[a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+)?/;

let city = document.getElementById('city');
let errorCity = document.getElementById('cityErrorMsg');
let cityValidation = /^[a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÈÉÎÌ][a-zéèêàçîï]+)?/;


submitForm.addEventListener('click', function(e) {
  e.preventDefault();

  if(firstName.validity.valueMissing) {
    e.preventDefault();
    errorFirstName.textContent = 'Veuillez renseigner ce champ';
  } else if(firstNameValidation.test(firstName.value) == false) {
    e.preventDefault();
    errorFirstName.textContent = 'Format incorrect';
  }

  if(lastName.validity.valueMissing) {
    e.preventDefault();
    errorLastName.textContent = 'Veuillez renseigner ce champ';
  } else if(lastNameValidation.test(lastName.value) == false) {
    e.preventDefault();
    errorLastName.textContent = 'Le format est incorrect';
  }

  if(address.validity.valueMissing) {
    e.preventDefault();
    errorAddress.textContent = 'Veuillez renseigner ce champ';
  } else if(adressValidation.test(address.value) == false) {
    e.preventDefault();
    errorAddress.textContent = 'Format incorrect';
  }

  if(city.validity.valueMissing) {
    e.preventDefault();
    errorCity.textContent = 'Veuillez renseigner ce champ';
  } else if(cityValidation.test(city.value) == false) {
    e.preventDefault();
    errorCity.textContent = 'Format incorrect';
  }

})


// let inputs = document.querySelectorAll('input[type="text"]');
// console.log("result: " + inputs);