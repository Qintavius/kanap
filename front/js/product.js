const params = new URLSearchParams(document.location.search);   //récupération de l'id dans l'url
const itemId = params.get('id');
    //console.log(itemId);

let itemData = [];      //stock les élément du produit

const requestItem = async () => {
    await fetch(`http://localhost:3000/api/products/${itemId}`)     //indique qu'il faut récupérer l'id dans le tableau json
        .then((resolve) =>
            resolve.json())
        .then((data) => {
            itemData = data;
                //console.log(itemData);
        })
        .catch((err) => {       //message d'erreur si pas de reponse de l'api
            //console.log("Erreur: " + err);
    });
};

requestItem();

//Affichage du produit dans la page 
const displayItem = async () => {
    await requestItem();        //Continue le script si l'api communique

    //Injection du JS dans la page HTML
    document.querySelector('.item__img').innerHTML = `
    <img src="${itemData.imageUrl}" alt="Photographie d'un canapé">`;

    document.querySelector('.item__content__titlePrice #title').innerHTML = `
    ${itemData.name}`;

    document.querySelector('.item__content__titlePrice #price').innerHTML = `
    ${itemData.price}`;

    document.querySelector('.item__content__description #description').innerHTML = `
    ${itemData.description}`;

    //Variable de l'option de couleur
    let selColor = document.querySelector('.item__content__settings #colors');
        //console.log(selColor);

        //console.log(itemData.colors);

    //Ajout des options de couleurs référencées dans le tableau
    itemData.colors.forEach((color) => {
            //console.log(document.createElement("option"));
        let optionColor = document.createElement("option");

        optionColor.innerHTML = `${color}`;
        optionColor.value = `${color}`;

        selColor.appendChild(optionColor);
    })
    addCart(itemData);  //Fonction du bouton ajour au panier lié au produit
};

displayItem();


//création de la fonction ajouter au panier
const addCart = () => {     
    let addButton = document.getElementById('addToCart');
        //console.log(addButton);
    addButton.addEventListener('click', () => {     //écoute sur le bouton ajouter au panier
        let productTab = JSON.parse(localStorage.getItem("article"))    //Récupération du tableau products dans le local storage
        let select = document.getElementById('colors');       // variable pour permettre la sélection de couleur
            console.log(select.value);
            console.log(productTab);

        const productColor = Object.assign({}, itemData, {      // Sélection de la couleur du produit dans le local storage
            color: `${select.value}`,
            quantity: 1,
        });
        console.log(productColor);

        if(productTab == null) {    // Si le local storage est vide
            productTab = []
            productTab.push(itemData);      // on ajoute le produit sélectionné au local storage
                console.log(productTab)

            localStorage.setItem("article", JSON.stringify(productTab));    //le tableau est retourné sous forme string
        }
    })
};