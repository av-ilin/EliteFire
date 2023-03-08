let REFS = {
    Продукция: "production",
    Конструктор: "constructor",
    Опыт: "exp",
    Контакты: "contacts",
};

const navigation = document.getElementsByClassName("navigation")[0];
const burger = document.getElementsByClassName("navigation__burger")[0];
const menu = document.getElementsByClassName("menu")[0];
const body = document.getElementsByTagName("body")[0];

let baseNavPaddingTop = +getComputedStyle(navigation).paddingTop.split("px")[0];
console.log(baseNavPaddingTop);
window.addEventListener("scroll", function () {
    navigation.style.paddingTop = `${Math.max(
        0,
        baseNavPaddingTop - this.window.scrollY
    )}px`;
    if (this.window.scrollY > 85)
        navigation.classList.add("navigation--scroll");
    else navigation.classList.remove("navigation--scroll");
});

for (let item of document.getElementsByClassName("navigation-item")) {
    let idSection = REFS[item.textContent];
    let section = document.getElementById(idSection);
    item.onclick = function () {
        section.scrollIntoView({ behavior: "smooth" });

        if (window.innerWidth <= 1024) {
            body.style.overflow = "visible";
            if (menu.classList.contains("menu--active")) {
                menu.classList.remove("menu--active");
            }
            if (burger.classList.contains("active"))
                burger.classList.remove("active");
            else burger.classList.add("active");
        }
    };
}

window.addEventListener("resize", function () {
    baseNavPaddingTop = +getComputedStyle(navigation).paddingTop.split("px")[0];
});

burger.onclick = function () {
    if (menu.classList.contains("menu--active")) {
        body.style.overflow = "visible";
        menu.classList.remove("menu--active");
    } else {
        body.style.overflow = "hidden";
        menu.classList.add("menu--active");
    }

    if (burger.classList.contains("active")) burger.classList.remove("active");
    else burger.classList.add("active");
};
