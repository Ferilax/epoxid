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
	const allScenes = document.querySelectorAll("[data-scene]");
	const html = document.querySelector("html");

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

	// Переключает на следующую сцену
	function goToNextScene(maxScenes) {
		if (currentScene < maxScenes) {
			currentScene++
		}
		// Применяем изменения
		updateAllScenes();
	}

	// Инициализация
	updateAllScenes();

	// -----------------------------------------------------------------------------------------------------

	let isScrollLocked = false;
	let lastScrollTime = 0; // Время последнего скролла
	const scrollDelay = 300; // Задержка в мс (0.5 секунды)
	let allScenesIsPlayed = false;

	// Функция проверки, находится ли центр блока в центре экрана
	function isCenterInView() {
		const rect = slideShow.getBoundingClientRect();
		const blockCenter = rect.top + rect.height / 2;
		const windowCenter = window.innerHeight / 2;
		return Math.abs(blockCenter - windowCenter) < 50; // Допустимая погрешность (50px)
	}

	// Функция для плавной прокрутки к центру блока
	function scrollToBlockCenter() {
		// Получаем координаты блока относительно документа
		const blockRect = slideShow.getBoundingClientRect();
		const blockTop = blockRect.top + window.scrollY;
		const blockHeight = blockRect.height;
		// Вычисляем позицию для скролла (центр блока - половина высоты окна)
		const scrollToPosition = blockTop + blockHeight / 2 - window.innerHeight / 2;
		// Плавный скролл
		window.scrollTo({
			top: scrollToPosition,
			behavior: "smooth"
		});
	}

	// Блокировка скролла
	function lockScroll() {
		isScrollLocked = true;
		console.log("Скролл заблокирован!");
		html.classList.add("slide-showed");
	}

	// Разблокировка скролла
	function unlockScroll() {
		isScrollLocked = false;
		allScenesIsPlayed = true;
		html.classList.remove("slide-showed");
	}

	function onLockedScroll() {
		// Определяем лимит сцен в зависимости от ширины экрана
		const isDesktop = window.innerWidth >= SLIDESHOW_CONFIG.breakpoint;
		const maxScenes = isDesktop
			? SLIDESHOW_CONFIG.maxScenes.desktop
			: SLIDESHOW_CONFIG.maxScenes.mobile;

		// Разблокируем скролл при достижении последней сцены
		if (currentScene >= maxScenes) {
			unlockScroll();
			return;
		}

		// Задержка для смены сцен
		const now = Date.now();
		if (now - lastScrollTime > scrollDelay) { // Проверяем задержку
			lastScrollTime = now;
			goToNextScene(maxScenes);
		}
	}

	// Запрещаем скролл колесом мыши/тачпадом при блокировке
	window.addEventListener("scroll", (e) => {
		if (!isScrollLocked && !allScenesIsPlayed && isCenterInView()) {
			scrollToBlockCenter();
			lockScroll();
		}

	});

	// Запрещаем скролл колесом мыши/тачпадом при блокировке
	window.addEventListener("wheel", (e) => {
		if (isScrollLocked) {
			onLockedScroll();
		}
	});

	// Запрещаем скролл на тач-устройствах
	window.addEventListener("touchmove", (e) => {
		if (isScrollLocked) {
			onLockedScroll();
		}
	});
}());

