const apiTeddies = "http://localhost:3000/api/teddies/";

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

class AddCard {
    addCard() {
        const btn = document.querySelectorAll(".btn");
        const cardNumber = document.querySelector(".card span");

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
                        let sameProduct = card.find(
                            (id) => id._id === data._id
                        );
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

        for (let i = 0; i < btn.length; i++) {
            btn[i].addEventListener("click", (e) => {
                let dataId = e.target.getAttribute("data-id");
                fetchProduct(dataId);
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
        document.title = "Orinoco - " + this.product.name;
        return this.product;
    }
}

export { apiTeddies, displayNumberOfProducds, Fetch, AddCard };
