const params = new URLSearchParams(document.location.search);
const itemId = params.get('id');
console.log(itemId);

let itemData = [];      //stock les élément du produit

const requestItem = async () => {
    await fetch(`http://localhost:3000/api/products/${itemId}`)
        .then((resolve) =>
            resolve.json())
        .then((data) => {
            itemData = data;
            console.log(itemData);
        })
        .catch((err) => {       //message d'erreur si pas de reponse de l'api
        console.log("Erreur: " + err);
    });
};

requestItem();

const displayItem = async () => {
    await requestItem();        //Continu le script si l'api communique

    document.querySelector('.item__img').innerHTML = `
    <img src="${itemData.imageUrl}" alt="Photographie d'un canapé">`;

    document.querySelector('.item__content__titlePrice #title').innerHTML = `
    ${itemData.name}`;

    document.querySelector('.item__content__titlePrice #price').innerHTML = `
    ${itemData.price}`;

    document.querySelector('.item__content__description #description').innerHTML = `
    ${itemData.description}`;

    let selColor = document.querySelector('.item__content__settings #colors');
    console.log(selColor);

    console.log(itemData.colors);

    itemData.colors.forEach((color) => {
        console.log(document.createElement("option"));
        let optionColor = document.createElement("option");

        optionColor.innerHTML = `${color}`;
        optionColor.value = `${color}`;

        selColor.appendChild(optionColor);
    })
};

displayItem();