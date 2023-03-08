let lighter = null;
let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
};
let callback = function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            if (lighter == null) lighter = entry.target;
            lighter.classList.remove("_active");
            entry.target.classList.add("_active");
            lighter = entry.target;
        }
    });
};
let observer = new IntersectionObserver(callback, options);
Array.from(document.getElementsByClassName("light")).forEach((elem) =>
    observer.observe(elem)
);
