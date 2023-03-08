const swiperHearth = new Swiper(".info__swiper", {
    loop: true,
    navigation: {
        nextEl: ".info__swiper-button-next",
        prevEl: ".info__swiper-button-prev",
    },
});

var priceItem = {
    value: 99000,
    set price(value) {
        this.value = value;
        this.elem.textContent = `${value.toLocaleString()}₽`;
    },
    get price() {
        return this.value;
    },
    elem: document.getElementById("price"),
};

const rangeLength = new Range(0.5, 6.5, 0.5);
const colors = ["#b8542a", "rebeccapurple", "aqua"];
const colorAuthor = document.getElementById("color");
const swiperAuthor = new Swiper(".author__swiper", {
    loop: true,
    navigation: {
        nextEl: ".author__swiper-button-next",
        prevEl: ".author__swiper-button-prev",
    },
    pagination: {
        el: ".author__swiper-pagination",
        clickable: true,
    },
});
swiperAuthor.on("slideChange", function () {
    colorAuthor.style.backgroundColor = colors[swiperAuthor.realIndex];
    priceItem.price = Math.round(Math.random() * (2e6 - 99e3) + 99e3);
});

//
for (let optionItem of document.getElementsByClassName("author__func-field")) {
    optionItem.onclick = function () {
        if (optionItem.classList.contains("author__func-field--active"))
            optionItem.classList.remove("author__func-field--active");
        else optionItem.classList.add("author__func-field--active");
        priceItem.price = Math.round(Math.random() * (2e6 - 99e3) + 99e3);
    };
}
