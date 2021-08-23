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
        const updateNumberOfId = () => {
            let newId = 0;
            for (let i = 0; i < card.length; i++) {
                newId = card[i].newId;
            }
            newId++;
            localStorage.setItem("newId", newId);
        };

        for (let i = 0; i < btn.length; i++) {
            btn[i].addEventListener("click", (e) => {
                let dataId = e.target.getAttribute("data-id");
                const fetchProduct = async () => {
                    await fetch(apiTeddies + dataId)
                        .then((res) => res.json())
                        .then((data) => {
                            const color =
                                document.getElementById("colors").value;
                            if (
                                card.length !== 0 &&
                                card.find(
                                    (product) =>
                                        product._id === data._id &&
                                        product.color === color
                                )
                            ) {
                                let sameProduct = card.find(
                                    (product) =>
                                        product._id === data._id &&
                                        product.color === color
                                );
                                localStorage.setItem(
                                    "card",
                                    JSON.stringify(sameProduct.quantity++)
                                );
                                localStorage.setItem(
                                    "card",
                                    JSON.stringify(card)
                                );
                                console.log(
                                    sameProduct.name + " ajouté au panier"
                                );
                            } else {
                                data.quantity = 1;
                                data.newId = 1;
                                updateNumberOfId();
                                data.newId = parseInt(
                                    localStorage.getItem("newId")
                                );
                                for (let i = 0; i < data.colors.length; i++) {
                                    if (data.colors[i] == color) {
                                        data.color = data.colors[i];
                                    }
                                }
                                card.push(data);
                                localStorage.setItem(
                                    "card",
                                    JSON.stringify(card)
                                );
                                console.log(
                                    data.name + " ajouté au panier new"
                                );
                            }
                        });
                    updateNumberOfproduct();
                };
                fetchProduct();
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
            let total = 0;
            for (let i = 0; i < card.length; i++) {
                total += (card[i].price * card[i].quantity) / 100;
            }
            const totalDisplay = document.querySelector(".total span");
            const more = document.querySelectorAll("#more");
            const less = document.querySelectorAll("#less");
            const quantity = document.querySelectorAll("#quantity");

            for (let i = 0; i < more.length; i++) {
                more[i].addEventListener("click", (e) => {
                    const id = e.path[2].getAttribute("data-id");
                    const option = e.path[2].getAttribute("data-option");
                    const newId = parseInt(
                        e.path[2].getAttribute("data-newId")
                    );

                    for (let i = 0; i < card.length; i++) {
                        if (
                            id === card[i]._id &&
                            newId === card[i].newId &&
                            card[i].quantity < 99
                        ) {
                            localStorage.setItem(
                                "card",
                                JSON.stringify(card[i].quantity++)
                            );
                            localStorage.setItem("card", JSON.stringify(card));

                            quantity[i].textContent = JSON.parse(
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
                            newId === card[i].newId &&
                            card[i].quantity === 99
                        ) {
                            console.log(
                                "Vous ne pouvez pas dépaser 99 produits"
                            );
                        }
                    }
                });
                less[i].addEventListener("click", (e) => {
                    const id = e.path[2].getAttribute("data-id");
                    const option = e.path[2].getAttribute("data-option");
                    const newId = parseInt(
                        e.path[2].getAttribute("data-newId")
                    );
                    for (let i = 0; i < card.length; i++) {
                        if (
                            id === card[i]._id &&
                            newId === card[i].newId &&
                            card[i].quantity > 1
                        ) {
                            localStorage.setItem(
                                "card",
                                JSON.stringify(card[i].quantity--)
                            );
                            localStorage.setItem("card", JSON.stringify(card));

                            quantity[i].textContent = JSON.parse(
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
                            newId === card[i].newId &&
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
            const lenght = document.querySelectorAll("#deleteProduct");

            for (let i = 0; i < lenght.length; i++) {
                const deleteProduct =
                    document.querySelectorAll("#deleteProduct");

                deleteProduct[i].addEventListener("click", (e) => {
                    const newId = parseInt(
                        e.path[2].getAttribute("data-newId")
                    );
                    if (newId === card[i].newId) {
                        if (i === 0) {
                            let x = 1;
                            card.splice(i, x);
                        } else {
                            let x = i;
                            card.splice(i, x);
                        }
                        localStorage.setItem("card", JSON.stringify(card));
                        document.location.reload();
                        updateNumberOfproduct();
                    }
                });
            }
        }
    }
    option() {
        const option = document.querySelectorAll("#colors");
        const product = document.querySelectorAll(".product");

        for (let i = 0; i < option.length; i++) {
            option[i].addEventListener("click", () => {
                const id = product[i].getAttribute("data-id");
                if (id === card[i]._id) {
                    card[i].color = option[i].value;
                    localStorage.setItem("card", JSON.stringify(card));
                }
            });
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
