//чекбокс
function toggleCheckbox() {
    const checkbox = document.querySelectorAll('.filter-check_checkbox');
    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener('change', function () {
            if (this.checked) {
                this.nextElementSibling.classList.add("checked");
            } else {
                this.nextElementSibling.classList.remove("checked");
            }
        });
    };
};
//end чекбокс

//корзина
function toggleCart() {
    const btnCart = document.getElementById("cart");
    const moduleCart = document.querySelector('.cart');
    const closeBtn = document.querySelector('.cart-close');
    btnCart.addEventListener('click', () => {
        moduleCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    closeBtn.addEventListener('click', () => {
        moduleCart.style.display = 'none';
        document.body.style.overflow = '';

    });
};

// конец end корзин

//добавление товара в корзину
function addCart() {
    const cards = document.querySelectorAll('.goods .card');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmpty = document.getElementById('cart-empty');
    const countGoods = document.querySelector('.counter');


    cards.forEach((card) => {
        const btn = card.querySelector('button');
        btn.addEventListener('click', function () {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            showDate();

            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';
            removeBtn.addEventListener('click', () => {
                cardClone.remove();


            });
        });
    });

    function showDate() {
        const cardsCart = cartWrapper.querySelectorAll('.card'),
            cardsPrice = cartWrapper.querySelectorAll('.card-price'),
            cardTotal = document.querySelectorAll('.span');

        countGoods.textContent = cardsCart.length;
        let sum = 0;
        cardsPrice.forEach((cardPrice) => {
            let price = parseFloat(cardPrice.textContent)
            sum += price;
        });
        cardTotal.textContent = sum;
        if (cardsCart.length === 0) {
            cartWrapper.appendChild(cartEmpty);
        } else {

            cartEmpty.remove();
        }

    };
};
//end добавление товара в корзину




//фильтр акции

function actionPage() {
    const cards = document.querySelectorAll('.card');
    const discountCheckbox = document.getElementById('discount-checkbox');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const goods = document.querySelector('.goods');
    const search = document.querySelector('.search-wrapper_input');
    const searchBtn = document.querySelector('.search-btn');

    discountCheckbox.addEventListener('click', function () {
        cards.forEach((card) => {
            if (discountCheckbox.checked) {
                if (!card.querySelector('.card-sale')) {
                    card.parentNode.remove();
                } else {
                    goods.appendChild(card.parentNode);
                }
            };
        });
    });

    function filterPrice() {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);

            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.remove();
            } else {
                goods.appendChild(card.parentNode);
            }

        });
    };

    min.addEventListener('change', filterPrice);
    max.addEventListener('change', filterPrice);

    searchBtn.addEventListener('click', function () {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            if (!searchText.test(title.textContent)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });

    });

};
//end акции


// Выводим карточки товара
function getData() {
    const goodsWarapper = document.querySelector('.goods');
    return fetch('../db/db.json')
        .then((response) => {
            if (PaymentResponse.ok) {
                return response.json();
            } else {
                throw new Error('Данные не были получены,ошибка' + response.status);
            }
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.warn(err);
            goodsWarapper.innerHTML = 'div style="color:red; font-size:30px>'
        });
};












toggleCheckbox();
toggleCart();
addCart();
actionPage();
getData();