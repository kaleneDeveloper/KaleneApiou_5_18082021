// const apiTeddies = "http://localhost:3000/api/teddies/";
const cardNumber = document.querySelector(".card span");
const result = document.getElementById("result");
let products = [];

import {apiTeddies} from "./function.js";

const fetchProducts = async () => {
    await fetch(apiTeddies)
        .then((res) => res.json())
        .then((data) => (products = data));
};
const display = () => {
    const displayProducts = () => {
        if (products.length === 0) {
            result.innerHTML = "<h2>Aucun résultat</h2>";
        } else {
            result.innerHTML = products
                .map((product) => {
                    return `<div class="product" data-id=${product._id}>
                                <div>
                                    <a href="./produit.html?${product._id}"><h2>${product.name}</h2></a>
                                </div>
                                <div>
                                    <input data-id=${product._id} type="submit" value="Ajouter au panier">
                                </div>
                            </div>
                            `;
                })
                .join("");
        }
    };
    const displayNumberOfProducds = () => {
        if (
            (cardNumber.textContent =
                JSON.parse(localStorage.getItem("NumberOfProduct")) === null)
        ) {
            cardNumber.textContent = 0;
        } else {
            cardNumber.textContent = JSON.parse(
                localStorage.getItem("NumberOfProduct")
            );
        }
    };
    displayProducts();
    displayNumberOfProducds();
};

const addCard = () => {
    const inputs = document.querySelectorAll("input");
    let card = JSON.parse(localStorage.getItem("card"));

    if (card === null) {
        card = [];
    } else {
        card = JSON.parse(localStorage.getItem("card"));
    }

    const updateNumberOfproduct = () => {
        let x = 0;
        for (let i = 0; i < card.length; i++) {
            x += card[i].quantity;
        }
        localStorage.setItem("NumberOfProduct", x);
        cardNumber.textContent = JSON.parse(
            localStorage.getItem("NumberOfProduct")
        );
    };
    const fetchProduct = async (dataId) => {
        await fetch(apiTeddies + dataId)
            .then((res) => res.json())
            .then((data) => {
                if (
                    card.length !== 0 &&
                    card.find((id) => id._id === data._id)
                ) {
                    let sameProduct = card.find((id) => id._id === data._id);
                    localStorage.setItem(
                        "card",
                        JSON.stringify(sameProduct.quantity++)
                    );
                    localStorage.setItem("card", JSON.stringify(card));
                } else {
                    data.quantity = 1;
                    card.push(data);
                    localStorage.setItem("card", JSON.stringify(card));
                }
            });
        updateNumberOfproduct();
    };

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("click", (e) => {
            let dataId = e.target.getAttribute("data-id");
            fetchProduct(dataId);
        });
    }
};
fetchProducts()
    .then(() => display())
    .then(() => addCard());
