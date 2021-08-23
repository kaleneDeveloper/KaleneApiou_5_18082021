import { apiTeddies, displayNumberOfProducds, Fetch, Card } from "./function.js";

let product = [];

const fetchProduct = async () => {
    const queryString_Url_id = window.location.search;
    const apiTeddiesId = apiTeddies + queryString_Url_id.slice(1);
    await new Fetch().fetchProduct(apiTeddiesId).then((res) => (product = res));
    document.title = "Orinoco - " + product.name;
};

const display = () => {
    displayNumberOfProducds();
    if (product.length === 0) {
        result.innerHTML = "<h2>Pas de produit :</h2>";
    } else {
        let colors = [];

        product.colors.map((color) => {
            colors.push(`<option>${color}</option>`);
        });
        result.innerHTML = `
            <div class="card">
                <div class="card--content">
                    <h2>${product.name}</h2>
                    <img src="${product.imageUrl}" alt="${product.description}">
                    <p>${product.description}</p>
                    <p>${(product.price/100).toFixed(2)} €</p>
                    <select id="colors">
                    ${colors.join("")}
                    </select >
                </div>
                <div>
                    <input class="btn" data-id=${
                        product._id
                    } type="submit" value="Ajouter au panier">
                </div>
            </div>`;
    }
};

const addToCard = () => {
    new Card().addCard();
};

fetchProduct()
    .then(() => display())
    .then(() => addToCard());
