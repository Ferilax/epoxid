(function () {
	const warning = document.querySelector(".warning");
	const hideBtn = warning.querySelector(".hide")

	hideBtn.addEventListener("click", () => {
		sessionStorage.setItem("warning_status", "hidden");
		warning.classList.remove("active")
	});

	if (sessionStorage.getItem("warning_status") !== "hidden") {
		setTimeout(() => {
			warning.classList.add("active");
		}, 4000);
	}
}());