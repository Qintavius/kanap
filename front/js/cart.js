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
// Fonction total quantitée
//-------------------------------------------------
displayTotalQuantity = (item) => {
  const totalQuantity = document.getElementById("totalQuantity")
  const total = cart.reduce((total, item) => total + item.quantity, 0)
  totalQuantity.textContent = total;
}
displayTotalQuantity();

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
// sauvegarde du nouveau panier
//-------------------------------------------------
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
// console.log(cart);

let itemNumber = document.querySelector('input.itemQuantity');
console.log(itemNumber);

itemNumber.addEventListener('input', (q) => { 
  // console.log(itemNumber);
  
});
