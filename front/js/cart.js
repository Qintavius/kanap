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
function updateCart() {
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
    updateCart();
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

  let productInStorage = cart[i].id;
  console.log('resultat ' + productInStorage);

  cart = cart.filter( el => el.id !== productInStorage)
  console.log(cart);

  displayTotalQuantity();
  displayTotalPrice();
  updateCart();
  alert('Le produit ' + `${item.name}` + ',' + ' couleur ' + `${item.color}` + ' à été supprimé');
  // Actualisation de la page pour afficher le panier sauvegardé
  window.location.reload()
  })
}

//-------------------------------------------------
// Formulaire
//-------------------------------------------------
