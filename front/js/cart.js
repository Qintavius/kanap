let cart = JSON.parse(localStorage.getItem('cart'));
// console.log(cart);

let items = [];

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

//-------------------------------------------------
// Fonction total quantitée
//-------------------------------------------------
let itemQuantity = function() {
  let foundQuantity = cart.map((i) => i.quantity);
  const reducer = (accumulator, curr) => accumulator + curr;
// console.log(foundQuantity);
  let sumQuantity = foundQuantity.reduce(reducer);
  // for(i =0; i< items.length; i++){
  //   totalQuantity = Number(foundQuantity[i]) + Number(totalQuantity);
  // }
  // console.log(foundQuantity.reduce(reducer));
  return sumQuantity;
}

//-------------------------------------------------
// Fonction total prix
//-------------------------------------------------
let itemPrice = function() {
  let foundPrice = cart.map((i) => i.totalPrice);
  const reducer = (accumulator, curr) => accumulator + curr;
// console.log(foundPrice);
  let sum = foundPrice.reduce(reducer);
  // for (let i = 0; i < items.length; i++){
  //   sum += Number(foundPrice[i]) * Number(foundQuantity[i]);
  // }
  // console.log(sum);
  // console.log(foundPrice.reduce(reducer));
  return sum;
}
console.log(itemPrice());

//-------------------------------------------------
// sauvegarde du nouveau panier
//-------------------------------------------------
let updateCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
}
// console.log(cart);

//-------------------------------------------------
// Fonction somme prix + quantité
//-------------------------------------------------
function total() {
  let priceSum = itemPrice();
  document.getElementById("totalPrice").innerHTML = priceSum;

  localStorage.setItem('priceSum', JSON.stringify(priceSum));

  let quantitySum = itemQuantity();
  document.getElementById("totalQuantity").innerHTML = quantitySum;

  updateCart();
}
total();

let selectedQuantity = Array.from(document.querySelector('.itemQuantity'));
let totalPriceCart = Array.from(document.querySelector('#totalPrice'));
let totalQuantity = Array.from(document.querySelector('.cart__item__content__settings__quantity p'));

selectedQuantity.forEach(function (quantity, i) {
  quantity.addEvenlister("input", (e) => {
    e.preventDefault();
    let addItemPrice = quantity.value * cart[i].price;
    console.log(quantity.value);

    totalQuantity[i].innerHTML = "Qté: " + quantity.value;
    cart[i].quantity = parseInt(quantity.value);

    totalPriceCart[i].innerHTML = addItemPrice;
    cart[i].totalPriceCart = addItemPrice;

    total();
  });
});

