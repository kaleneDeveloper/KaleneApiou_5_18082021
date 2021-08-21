const queryString_Url_id = window.location.search;
const id = queryString_Url_id.slice(1);
const apiTeddies = "http://localhost:3000/api/teddies/" + id;
const containerBlockProduct = document.querySelector(
    ".container--block--product"
);

let product = [];

const fetchProducts = async () => {
    await fetch(apiTeddies)
        .then((res) => res.json())
        .then((data) => (product = data));
    document.title = "Orinoco - " + product.name;
};

const displayProducts = () => {
    if (product.length === 0) {
        containerBlockProduct.innerHTML = "<h2>Pas de produit :</h2>";
    } else {
        let colors = [];
        product.colors.map((color) => {
            colors.push(`<li>${color}</li>`);
        });
        containerBlockProduct.innerHTML = `
        <div class="card">
                <h2>${product.name}</h2>
                <img src="${product.imageUrl}" alt="${product.description}">
                <p>${product.description}</p>
                <p>${product.price}</p>
                <p>${colors.join("")}</p>
        </div>`;
    }
};

fetchProducts().then(() => displayProducts());
