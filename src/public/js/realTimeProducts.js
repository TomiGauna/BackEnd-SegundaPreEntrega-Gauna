const socket = io();

const updateGroup = (products) => {
    /* const articlescontainer = document.getElementById('articlescontainer') */
    /* articlescontainer.innerHTML = ''; */

    products.forEach(prod => {
        const itemContainer = document.createElement('div');
        itemContainer.className = "eachprod";
        itemContainer.innerHTML = `
        <h3>${prod.title}</h3>
        <p>${prod.description}</p>
        <h4>${prod.price}</h4>
        <p>Stock: ${prod.stock}</p>
        <p>Code: ${prod.code}</p>`;

        articlescontainer.appendChild(itemContainer);

    });
}

socket.on('addingProds', (products) => {
    updateGroup(products);
  });
