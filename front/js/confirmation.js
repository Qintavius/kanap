const ordered = JSON.parse(sessionStorage.getItem('orders'));

const orderDisplay = async () => {
    // console.log('commande passé');

    if (ordered) {
        await ordered
        const lastElement = ordered[ordered.length -1]; // Retourne dernier élément du tableau (en cas de commande doublé)
        // console.log(lastElement);

        orderId.innerHTML = `${lastElement.order}`
    }
};

orderDisplay();