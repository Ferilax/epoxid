(function () {
	const accordions = document.querySelectorAll(".accordion");
	const TRANSITION_END_EVENT = "transitionend";

	const CLASSES = {
		OPEN: "open",
		ACCORDION: ".accordion",
		MENU: ".accordion__menu",
		TRIGGER: ".accordion__trigger",
	}

	// Инициализация - устанавливаем начальную высоту
	function initAccordions() {
		accordions.forEach(accordion => {
			const menu = accordion.querySelector(CLASSES.MENU);
			menu.style.height = "0";
			menu.style.overflow = "hidden";
			menu.style.transition = "0.3s";
		});
	}

	// Закрытие аккордеона
	function closeAccordion(accordion, menu) {
		menu.style.height = `${menu.scrollHeight}px`;

		// Принудительный reflow для анимации
		void menu.offsetHeight;

		menu.style.height = "0";
		menu.style.pointerEvents = "none";
		accordion.classList.remove(CLASSES.OPEN);
	}

	// Открытие аккордеона
	function openAccordion(accordion, menu) {
		menu.style.height = `${menu.scrollHeight}px`;
		menu.style.pointerEvents = "auto";
		accordion.classList.add(CLASSES.OPEN);
	}

	// Переключение состояния
	function toggleAccordion(accordion, menu) {
		const isClosed = menu.style.height === "0px";

		if (isClosed) {
			openAccordion(accordion, menu);
		} else {
			closeAccordion(accordion, menu);
		}

		// Обработчик завершения анимации
		const handleTransitionEnd = () => {
			if (menu.style.height !== "0px") {
				menu.style.height = "auto";
			}
			menu.removeEventListener(TRANSITION_END_EVENT, handleTransitionEnd);
		};

		menu.addEventListener(TRANSITION_END_EVENT, handleTransitionEnd);
	}

	// Обработчик кликов
	function handleClick(e) {
		const trigger = e.target.closest(CLASSES.TRIGGER);
		if (!trigger) return;

		const accordion = trigger.closest(CLASSES.ACCORDION);
		const menu = accordion.querySelector(CLASSES.MENU);

		toggleAccordion(accordion, menu);
	}

	// Инициализация
	initAccordions();
	document.addEventListener("click", handleClick);
}());
