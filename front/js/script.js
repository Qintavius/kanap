//let productsData = [];  //Stock les éléments de l'api
//
//const requestObjects = async() => {
//    await fetch('http://localhost:3000/api/products')     //Appel de l'API et continue le script si réponse requete avec await
//        .then((resolve) =>      //envoi d'une requete à l'api
//            resolve.json())
//        .then((data) => {
//            console.table(data);    //réponse de la requete
//            productsData = data;   //stock data(promise) dans productsData
//        })
//        .catch((err) => {       //message d'erreur si pas de reponse de l'api
//            const errMessage = document.querySelector('.titles h2');
//            errMessage.innerHTML = "Nous sommes désolés, nous ne pouvons pas afficher nos produits.<br>Essayez d'actualiser la page.";
//            console.log("Erreur: " + err);
//    });
//};
//
//const productsDisplay = async () => {
//    await requestObjects();     //La fonction d'affichage s'affiche si l'api est contacté
//    // Utilisation de '.map' pour exécuter l'action à chaque élément du tableau
//    document.getElementById('items').innerHTML = productsData.map((product) => `
//    <a href="./product.html?id=${product._id}">
//    <article>
//      <img src="${product.imageUrl}" alt="${product.altTxt}">
//      <h3 class="productName">${product.name}</h3>
//      <p class="${product.description}">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
//    </article>
//  </a>`).join("");
//};
//
//productsDisplay();  //Affiche les éléments dans la page

fetch('http://localhost:3000/api/products')
    .then((resolve) => 
        resolve.json())
    .then((data) => {
        productsData(data);
    })
    .catch((error) => {
        const errorCatch = document.querySelector('.titles h2');
        errorCatch.innerHTML = 'Nous sommes désolés, nous ne pouvons pas afficher nos articles.<br>Essayez d\'actualiser la page.';
        console.log('Message d\'erreur: ' + error);
});

function productsData(items) {
    let productsDisplay = document.getElementById('items');
    for (let item of items) {
        productsDisplay.innerHTML += `
        <a href="./product.html?id=${item._id}">
        <article>
          <img src="${item.imageUrl}" alt="${item.altTxt}">
          <h3 class="productName">${item.name}</h3>
          <p class="${item.description}">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
        </article>
      </a>`;
    }
};