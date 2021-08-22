import { displayNumberOfProducds, Card, Fetch } from "./function.js";

let products = [];

const fetchProducts = async () => {
    await new Fetch().fetchProducts().then((res) => (products = res));
};

const addToCard = () => {
    new Card().addCard();
};

const display = () => {
    displayNumberOfProducds();
    if (products.length === 0) {
        result.innerHTML = "<h2>Aucun résultat</h2>";
    } else {
        result.innerHTML = products
            .map((product) => {
                return `<div class="product" data-id=${product._id}>
                
                            <a href="./produit.html?${product._id}"><h2>${product.name}</h2></a>
            
                            <div>
                            <a href="./produit.html?${product._id}"><img src="${product.imageUrl}" alt="${product.description}"></a>
                            </div>

                            <div>
                            <a href="./produit.html?${product._id}"><p>${product.description}</p></a>
                            </div>
                        
                            <div> 
                                <input class="btn" data-id=${product._id} type="submit" value="Ajouter au panier">
                            </div>
                             <div>
                            <a href="./produit.html?${product._id}"><p>${(product.price/100).toFixed(2)} €</p></a>
                            </div>
                        </div>
                            `;
            })
            .join("");
    }

};

fetchProducts()
    .then(() => display())
    .then(() => addToCard());
