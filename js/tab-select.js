(function () {
	const CLASSES = {
		SELECT: ".tab-select",
		LIST: ".tab-select__ul",
		OPTION: ".tab-select__li",
		LABEL_TEXT: ".tab-select__text",
		ACTIVE: "active",
	}
	const selects = document.querySelectorAll(CLASSES.SELECT);

	selects.forEach(s => {
		s.addEventListener("click", (e) => {
			const isClickedUl = e.target.matches(CLASSES.LIST);

			if (!isClickedUl) {
				s.classList.toggle(CLASSES.ACTIVE);
			}

			const clickedOption = e.target.closest(CLASSES.OPTION);
			const label = s.querySelector(CLASSES.LABEL_TEXT);

			if (clickedOption) {
				label.innerText = clickedOption.innerText;
			}
		})
	})
}())