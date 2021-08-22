const apiTeddies = "http://localhost:3000/api/teddies/";
let card = JSON.parse(localStorage.getItem("card"));
if (card === null) {
    card = [];
} else {
    card = JSON.parse(localStorage.getItem("card"));
}

const displayNumberOfProducds = () => {
    const cardNumber = document.querySelector(".card span");
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

class Card {
    addCard() {
        const btn = document.querySelectorAll(".btn");
        const cardNumber = document.querySelector(".card span");

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
                        let sameProduct = card.find(
                            (id) => id._id === data._id
                        );
                        localStorage.setItem(
                            "card",
                            JSON.stringify(sameProduct.quantity++)
                        );
                        localStorage.setItem("card", JSON.stringify(card));
                        console.log(sameProduct.name + " ajouté au panier");
                    } else {
                        data.quantity = 1;
                        card.push(data);
                        localStorage.setItem("card", JSON.stringify(card));
                        console.log(data.name + " ajouté au panier");
                    }
                });
            updateNumberOfproduct();
        };

        for (let i = 0; i < btn.length; i++) {
            btn[i].addEventListener("click", (e) => {
                let dataId = e.target.getAttribute("data-id");
                fetchProduct(dataId);
            });
        }
    }
    emptyCard() {
        if (card && card.length !== 0) {
            empty.addEventListener("click", () => {
                localStorage.clear();
                displayNumberOfProducds();
                document.location.reload();
            });
        }
    }
    lessAndMore() {
        const cardNumber = document.querySelector(".card span");

        if (card && card.length !== 0) {
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
            const length = more.length === undefined ? 1 : more.length;
            let total = 0;
            for (let i = 0; i < card.length; i++) {
                total += (card[i].price * card[i].quantity) / 100;
            }
            const totalDisplay = document.querySelector(".total span");

            for (let i = 0; i < length; i++) {
                let moreVar = more.length === undefined ? more : more[i];
                let lessVar = more.length === undefined ? less : less[i];

                moreVar.addEventListener("click", (e) => {
                    const id = e.path[2].getAttribute("data-id");
                    for (let i = 0; i < card.length; i++) {
                        let quantityVar =
                            quantity.length === undefined
                                ? quantity
                                : quantity[i];

                        if (id === card[i]._id && card[i].quantity < 99) {
                            localStorage.setItem(
                                "card",
                                JSON.stringify(card[i].quantity++)
                            );
                            localStorage.setItem("card", JSON.stringify(card));

                            quantityVar.textContent = JSON.parse(
                                JSON.parse(localStorage.getItem("card"))[i]
                                    .quantity
                            );
                            total += card[i].price / 100;
                            totalDisplay.textContent = `Total : ${total.toFixed(
                                2
                            )} €`;
                            updateNumberOfproduct();
                        } else if (
                            id === card[i]._id &&
                            card[i].quantity === 99
                        ) {
                            console.log(
                                "Vous ne pouvez pas dépaser 99 produits"
                            );
                        }
                    }
                });

                lessVar.addEventListener("click", (e) => {
                    const id = e.path[2].getAttribute("data-id");

                    for (let i = 0; i < card.length; i++) {
                        let quantityVar =
                            quantity.length === undefined
                                ? quantity
                                : quantity[i];
                        if (id === card[i]._id && card[i].quantity > 1) {
                            localStorage.setItem(
                                "card",
                                JSON.stringify(card[i].quantity--)
                            );
                            localStorage.setItem("card", JSON.stringify(card));

                            quantityVar.textContent = JSON.parse(
                                JSON.parse(localStorage.getItem("card"))[i]
                                    .quantity
                            );
                            total -= card[i].price / 100;
                            totalDisplay.textContent = `Total : ${total.toFixed(
                                2
                            )} €`;
                            updateNumberOfproduct();
                        } else if (
                            id === card[i]._id &&
                            card[i].quantity === 1
                        ) {
                            console.log("Vous devez avoir plus de 1 produit");
                        }
                    }
                });
            }
        }
    }
    deleteProduct() {
        const cardNumber = document.querySelector(".card span");

        if (card && card.length !== 0) {
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
            const length =
                deleteProduct.length === undefined ? 1 : deleteProduct.length;
            for (let i = 0; i < length; i++) {
                let deleteProductVar =
                    deleteProduct.length === undefined
                        ? deleteProduct
                        : deleteProduct[i];

                deleteProductVar.addEventListener("click", (e) => {
                    const id = e.path[2].getAttribute("data-id");
                    for (let i = 0; i < card.length; i++) {
                        if (id === card[i]._id) {
                            console.log(i);
                            console.log("delete");
                            card.splice(i, i + 1);
                            localStorage.setItem("card", JSON.stringify(card));
                            document.location.reload();
                            updateNumberOfproduct();
                        }
                    }
                });
            }
        }
    }
}

class Fetch {
    async fetchProducts() {
        await fetch(apiTeddies)
            .then((res) => res.json())
            .then((data) => (this.products = data));
        return this.products;
    }

    async fetchProduct(apiTeddiesId) {
        await fetch(apiTeddiesId)
            .then((res) => res.json())
            .then((data) => (this.product = data));
        return this.product;
    }
}

export { apiTeddies, displayNumberOfProducds, Fetch, Card };
