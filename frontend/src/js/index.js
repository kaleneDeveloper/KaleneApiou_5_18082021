import { displayNumberOfProducds, Fetch } from "./function.js";

let products = [];

const fetchProducts = async () => {
    await new Fetch().fetchProducts().then((res) => (products = res));
};

const display = () => {
    displayNumberOfProducds();
    if (products.length === 0) {
        result.innerHTML = "<h2>Aucun résultat</h2>";
    } else {
        result.innerHTML = products
            .map((product) => {
                return `<div class="product" data-id=${product._id}>
                            <a href="./produit.html?${product._id}">
                                <h2>${product.name}</h2>
                                <div>
                                    <img src="${product.imageUrl}" alt="${product.description}">
                                </div>
                                <div>
                                    <p>${product.description}</p>
                                </div>
                                <div>
                                    <p>${(product.price/100).toFixed(2)} €</p>
                                </div>
                            </a>
                        </div>
                            `;
            })
            .join("");
    }
};

fetchProducts()
    .then(() => display());
