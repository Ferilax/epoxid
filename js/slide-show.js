(function () {
	// Конфигурация слайд-шоу
	const SLIDESHOW_CONFIG = {
		maxScenes: {
			desktop: 9,  // Макс. сцен для десктопа (ширина >= 1440px)
			mobile: 13,  // Макс. сцен для мобильных (ширина < 1440px)
		},
		breakpoint: 1440,
	};

	const slideShow = document.querySelector(".slide-show");
	const container = slideShow.querySelector(".container");
	const allScenes = document.querySelectorAll("[data-scene]");

	// Текущая активная сцена
	let currentScene = 1;

	/*
		Обновляет видимость сцены, добавляя соответствующий класс:
		- "active" для текущей сцены
		- "completed" для пройденных сцен
		- "inactive" для будущих сцен
	*/
	function updateSceneVisibility(sceneElement, sceneNumber) {
		// Сначала удаляем все возможные классы
		sceneElement.classList.remove("active", "completed", "inactive");

		// Определяем состояние сцены и добавляем нужный класс
		if (sceneNumber === currentScene) {
			sceneElement.classList.add("active");
		} else if (sceneNumber < currentScene) {
			sceneElement.classList.add("completed");
		} else {
			sceneElement.classList.add("inactive");
		}
	}

	// Обновляет видимость всех сцен на основе текущего номера (currentScene)
	function updateAllScenes() {
		// Сохраняем текущую сцену в data-атрибут
		slideShow.dataset.currentScene = currentScene;

		// Применяем обновление ко всем сценам
		allScenes.forEach((sceneElement) => {
			const sceneNumber = Number(sceneElement.dataset.scene);
			updateSceneVisibility(sceneElement, sceneNumber);
		});
	}

	// Переключает на следующую сцену (или возвращается к 1, если достигнут максимум)
	function goToNextScene() {
		// Определяем лимит сцен в зависимости от ширины экрана
		const isDesktop = window.innerWidth >= SLIDESHOW_CONFIG.breakpoint;
		const maxScenes = isDesktop
			? SLIDESHOW_CONFIG.maxScenes.desktop
			: SLIDESHOW_CONFIG.maxScenes.mobile;

		// Обновляем currentScene (с зацикливанием)
		currentScene = currentScene >= maxScenes ? 1 : currentScene + 1;

		// Применяем изменения
		updateAllScenes();
	}

	// Инициализация
	updateAllScenes();

	// Вешаем обработчик клика
	container.addEventListener("click", goToNextScene);
}());