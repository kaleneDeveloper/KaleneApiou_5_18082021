import { Card, displayNumberOfProducds } from "./function.js";
const cardLocalStorage = JSON.parse(localStorage.getItem("card"));

const display = async () => {
    displayNumberOfProducds();
    let total = 0;
    if (!cardLocalStorage || cardLocalStorage.length === 0) {
        result.innerHTML += `<div class="cardEmpty"><span>Panier vide</span><a href="./index.html">Voir les produits</a></div`;
    } else {
        result.innerHTML = cardLocalStorage
            .map((products) => {
                const price = () => {
                    let price = products.price / 100;
                    return price.toFixed(2);
                };
                total += price() * products.quantity;
                return `
                <div class="card" data-id="${products._id}">
                    <div><a href="./produit.html?${products._id}"><img src="${
                    products.imageUrl
                }" alt="${products.description}"></a></div>
                    <div><a href="./produit.html?${products._id}">Produit : ${
                    products.name
                }</a></div>
                    <div> <span>Quantité :</span> <input id="less" type="submit" value="-"><span id="quantity">${
                        products.quantity
                    }</span><input id="more" type="submit" value="+"></div>
                    <div class="price">Prix : <span>${price()} €</span></div>
                    <div><i id="deleteProduct" class="fas fa-times-circle"></i></div>
                </div>
                `;
            })
            .join("");

        result.innerHTML += `<div class="total"><span>Total : ${total.toFixed(
            2
        )} €</span></div`;
        result.innerHTML += `<div id="empty"><input type="submit" value="Vider le panier"></div`;
    }
};
const emptyCard = () => {
    new Card().emptyCard();
};
const card = () => {
    new Card().lessAndMore();
    new Card().deleteProduct();
};
display();
emptyCard();
card();
