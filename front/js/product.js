//----------------------------------------------------
//ID du produit isolé de l'url
//----------------------------------------------------
const parametresUrl = new URLSearchParams(window.location.search);
const id = parametresUrl.get("id");
    // console.log(id);

//----------------------------------------------------
//Définition des variables
//----------------------------------------------------
let image       = document.querySelector('.item__img');
let title       = document.querySelector('#title');
let price       = document.querySelector('#price');
let description = document.querySelector('#description');

let colors      = document.querySelector('#colors');
let seclectedColor;

let quantity    = document.querySelector('#quantity');
let selectedQuantity;

// Bouton commander
let addButton = document.querySelector('#addToCart');

//----------------------------------------------------
// Récupération des données de l'api avec ID produit
//----------------------------------------------------
fetch(`http://localhost:3000/api/products/${id}`)
.then(function(request) {
    if(request.ok){
        return request.json()
    }
})
.then(function(data) {
    // console.table(data);
    productDisplay(data);
    productSelected(data);
});

//----------------------------------------------------
//Affichage du produit
//----------------------------------------------------
let productDisplay = (data) => {
    image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    title.innerHTML = `${data.name}`;
    price.innerHTML = `${data.price}`;
    description.innerHTML = `${data.description}`;
        for(let color of data.colors) {
            colors.innerHTML += `<option value="${color}">${color}</option>`;
    }
}

//----------------------------------------------------
//Choix quantité produit
//----------------------------------------------------
quantity.addEventListener('input', (sq) => {
    selectedQuantity = sq.target.value;
    quantity = selectedQuantity;
    // console.log(selectedQuantity);
});

//----------------------------------------------------
//Choix couleur produit
//----------------------------------------------------
colors.addEventListener('input', (sc) => {
     seclectedColor = sc.target.value;
     color = seclectedColor;
    //  console.log(seclectedColor);
});

//----------------------------------------------------
//Condition ajout produit
//----------------------------------------------------
let productSelected = (data) => {
    addButton.addEventListener('click', (eB) => {
        eB.preventDefault();

        if(seclectedColor == '' || seclectedColor == undefined) {
            alert('Veuillez choisir une couleur');
            return [];
        }
        else if(selectedQuantity == 0 ||selectedQuantity == undefined) {
            alert('Veuillez choisir une quantitée');
            return [];
        }
        else if(selectedQuantity > 100 || selectedQuantity < 1) {
            alert('La quantitée doit être comprise entre 1 et 100')
            return [];
        }
        else {
            alert('L\'article a bien été ajouté');
        }

        //Variable de stockage de l'article selectionné
        let selectedItem = {
            id: data._id,
            color: seclectedColor,
            quantity: parseInt(selectedQuantity),
        }
        // console.log(selectedItem);

        //----------------------------------------------------
        //LocalStorage
        //----------------------------------------------------

        // Parcours du LS
        let storageProduct = JSON.parse(localStorage.getItem('cart'));

        // Si produit identique dans le LS => incrémantation
        if(storageProduct) {
            let item = storageProduct.find((item) => 
                item.id == selectedItem.id && item.color == selectedItem.color
            );

            while(item) {
                item.quantity = item.quantity + selectedItem.quantity;
                localStorage.setItem('cart', JSON.stringify(storageProduct));
                return;
            }

            storageProduct.push(selectedItem);
            localStorage.setItem('cart', JSON.stringify(storageProduct));

        // sinon création d'un nouvel objet contenant le nouveau produit ajouté
        } else {
            // Tableau de stockage des produits
            let newAddProduct = [];
            newAddProduct.push(selectedItem);
            localStorage.setItem('cart', JSON.stringify(newAddProduct));
        }
    });
}