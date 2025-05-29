const header = document.querySelector("#header");
const burgerButton = header.querySelector(".mobile-menu-trigger");
const mobileMenu = document.querySelector(".mobile-menu");
const html = document.querySelector("html");

function menuHandler(action) {
	if (action === "open") {
		mobileMenu?.classList.add("open");
		header?.classList.add("open");
		html.classList.add("lock");
	} else if (action === "close") {
		mobileMenu?.classList.remove("open");
		header?.classList.remove("open");
		html.classList.remove("lock");
	} else {
		mobileMenu?.classList.toggle("open");
		header?.classList.toggle("open");
		html.classList.toggle("lock");
	}
}

burgerButton.addEventListener("click", () => {
	menuHandler();
});

mobileMenu?.addEventListener("click", (e) => {
	const clickedLink = e.target.closest(".nav a");
	if (clickedLink) {
		menuHandler("close");
	}
});