(function () {
	// Объект с CSS классами
	const CLASSES = {
		TAB_SYSTEM: ".tab-system",
		TRIGGER: ".tab-trigger",
		CONTENTS_CONTAINER: ".tab-contents",
		CONTENT: ".tab-content",
		SELECT: ".tab-select",
		SELECT_LABEL: ".tab-select__text",
		ACTIVE: "active",
	};

	// -------------------------------------------------------------------------------------

	// Получаем все системы табов, триггеры и контенты на странице
	const tabsSystems = document.querySelectorAll(CLASSES.TAB_SYSTEM);
	const tabTriggers = document.querySelectorAll(CLASSES.TRIGGER);
	const tabSelects = document.querySelectorAll(CLASSES.SELECT);
	const tabContents = document.querySelectorAll(CLASSES.CONTENT);

	// -------------------------------------------------------------------------------------

	function initTabSystem(system) {
		// Фильтруем триггеры, относящиеся к текущей системе табов
		const triggers = [...tabTriggers].filter(t => {
			const parentRed = t.closest(CLASSES.TAB_SYSTEM);
			return parentRed === system;
		});
		// Фильтруем контенты, относящиеся к текущей системе табов
		const contents = [...tabContents].filter(c => {
			const parentRed = c.closest(CLASSES.TAB_SYSTEM);
			return parentRed === system;
		});
		// Ищем селект, относящийся к текущей системе табов
		const select = [...tabSelects].find(s => {
			const parentRed = s.closest(CLASSES.TAB_SYSTEM);
			return parentRed === system;
		});

		function updateTabs(currentTrigger) {
			const dataTab = currentTrigger.dataset.tab;

			if (select) {
				const selectLabel = select?.querySelector(CLASSES.SELECT_LABEL);
				selectLabel.innerText = currentTrigger.innerText;
			}

			// Находим соответствующий тригер(-ы)
			const currentTriggers = [...triggers].filter(trigger => trigger.dataset.tab === dataTab);
			// Находим соответствующий контент(-ы)
			const currentContents = [...contents].filter(content => content.dataset.tab === dataTab);

			// Удаляем класс active
			triggers.forEach(t => t.classList.remove(CLASSES.ACTIVE));
			contents.forEach(c => c.classList.remove(CLASSES.ACTIVE));

			// Добавляем класс active
			currentTriggers.forEach(t => t.classList.add(CLASSES.ACTIVE));
			currentContents.forEach(c => c.classList.add(CLASSES.ACTIVE));
		}

		// Добавляем обработчики клика на все триггеры
		triggers.forEach(t => t.addEventListener("click", () => updateTabs(t)));
	}

	// Инициализируем все системы табов на странице
	tabsSystems.forEach(s => initTabSystem(s))
})();