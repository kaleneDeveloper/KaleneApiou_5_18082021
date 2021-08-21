import { displayNumberOfProducds } from "./function.js";

const display = () => {
    displayNumberOfProducds();
    const cardLocalStorage = JSON.parse(localStorage.getItem("card"));
    let total = 0;

    result.innerHTML = cardLocalStorage
        .map((products) => {
            const price = () => {
                let price = products.price / 100;
                return price.toFixed(2);
            };
            total += price() * products.quantity;
            return `
            <div class="card">
                <div><a href="./produit.html?${products._id}"><img src="${
                products.imageUrl
            }" alt="${products.description}"></a></div>
                <div><a href="./produit.html?${products._id}">Produit : ${
                products.name
            }</a></div>
                <div>Prix : ${price()} €</div>
                <div>Quantité : ${products.quantity}</div>
            </div>
            `;
        })
        .join("");
    result.innerHTML += `<div class="total"><span>Total : ${total.toFixed(2)} €</span></div`;
};

display();
