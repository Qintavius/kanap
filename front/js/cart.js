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
let totalQuantity = function() {
  foundQuantity = cart.map((item) => item.quantity)
  const reducer = (accumulator, curr) => accumulator + curr;
// console.log(foundQuantity);
  let totalQuantity = foundQuantity.reduce(reducer);
  // for(i =0; i< items.length; i++){
  //   totalQuantity = Number(foundQuantity[i]) + Number(totalQuantity);
  // }
  document.querySelector("#totalQuantity").innerHTML = `${totalQuantity}`;

  console.log(foundQuantity.reduce(reducer));
}
totalQuantity();

//-------------------------------------------------
// Fonction total prix
//-------------------------------------------------
let totalPrice = function() {
  foundPrice = cart.map((item) => item.price)
  const reducer = (accumulator, curr) => accumulator + curr;
// console.log(foundPrice);
  let sum = foundPrice.reduce(reducer);
  // for (let i = 0; i < items.length; i++){
  //   sum += Number(foundPrice[i]) * Number(foundQuantity[i]);
  // }
  // console.log(sum);
  document.querySelector("#totalPrice").innerHTML = `${sum}`;

  console.log(foundPrice.reduce(reducer));
}
totalPrice();

