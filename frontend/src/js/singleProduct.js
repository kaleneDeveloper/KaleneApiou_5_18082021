import { apiTeddies, displayNumberOfProducds, Fetch, AddCard } from "./function.js";

let product = [];

const fetchProduct = async () => {
    const queryString_Url_id = window.location.search;
    const apiTeddiesId = apiTeddies + queryString_Url_id.slice(1);
    await new Fetch().fetchProduct(apiTeddiesId).then((res) => (product = res));
};

const addToCard = () => {
    new AddCard().addCard();
};

const display = () => {
    displayNumberOfProducds();
    if (product.length === 0) {
        result.innerHTML = "<h2>Pas de produit :</h2>";
    } else {
        let colors = [];

        product.colors.map((color) => {
            colors.push(`<li>${color}</li>`);
        });
        result.innerHTML = `
            <div class="card">
                <div class="card--content">
                    <h2>${product.name}</h2>
                    <img src="${product.imageUrl}" alt="${product.description}">
                    <p>${product.description}</p>
                    <p>${(product.price/100).toFixed(2)} €</p>
                    <p>${colors.join("")}</p>
                </div>
                <div>
                    <input class="btn" data-id=${
                        product._id
                    } type="submit" value="Ajouter au panier">
                </div>
            </div>`;
    }
};

fetchProduct()
    .then(() => display())
    .then(() => addToCard());
