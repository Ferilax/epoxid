(function () {

	Splide.defaults = {
		arrows: false,
		pagination: false,
		mediaQuery: "min",
	}

	function createSwiper(swiperSelector, options) {
		const hasSwiper = !!document.querySelector(swiperSelector);
		if (hasSwiper) {
			let splide = new Splide(swiperSelector, options);
			splide.mount();

			return splide;
		}
	}

	function createNavigation(options) {
		const {
			loop = false,
			splide,
			prevSelector,
			nextSelector,
		} = options;

		const prevButton = document.querySelector(prevSelector);
		const nextButton = document.querySelector(nextSelector);

		// Обработчик для кнопки "Назад"
		prevButton?.addEventListener('click', () => {
			if (loop && splide.index === 0) {
				splide.go(splide.length - 1); // Переход к последнему слайду
			} else if (splide.index > 0) {
				splide.go('-1');
			}
		});

		// Обработчик для кнопки "Вперед"
		nextButton?.addEventListener('click', () => {
			if (loop && splide.index === splide.length - 1) {
				splide.go(0); // Переход к первому слайду
			} else if (splide.index < splide.length - 1) {
				splide.go('+1');
			}
		});

		// Обновление состояния кнопок
		splide?.on('move', (newIndex) => {
			if (!loop) {
				prevButton.disabled = newIndex === 0;
				nextButton.disabled = newIndex === splide.length - 1;
			}
			// В режиме loop кнопки всегда активны
		});
	}

	// ---------------------------------------------------------------------------------------------------

	const startBannerSplide = createSwiper("#start-banner-splide", {
		perPage: 1,
		loop: true,
		type: "fade",
	})
	createNavigation({
		splide: startBannerSplide,
		nextSelector: "#start-banner-splide .next",
		loop: true,
	})

	createSwiper("#drugs-splide-1", {
		padding: "var(--container-padding)",
		gap: 10,

		breakpoints: {
			768: {
				perPage: 2,
				drag: false,
				padding: 0,
				gap: 20,
			}
		}
	})

	createSwiper("#drugs-splide-2", {
		padding: "var(--container-padding)",
		gap: 10,

		breakpoints: {
			768: {
				perPage: 2,
				drag: false,
				padding: 0,
				gap: 20,
			}
		}
	})

	createSwiper("#other-articles-splide", {
		perPage: 1,
		padding: "var(--container-padding)",
		gap: 10,

		breakpoints: {
			768: {
				perPage: 2,
				gap: 20,
			},
			1440: {
				perPage: 3,
				drag: false,
				autoWidth: true,
			}
		}
	})

	createSwiper("#opening-splide", {
		perPage: 1,
		padding: "var(--container-padding)",
		gap: 10,

		breakpoints: {
			768: {
				perPage: 2,
				gap: 22,
			},
			1024: {
				perPage: 3,
				drag: false,
			}
		}
	})

	createSwiper("#opening-neo-1", {
		perPage: 1,
		padding: "var(--container-padding)",
		gap: 10,

		breakpoints: {
			768: {
				perPage: 2,
				gap: 22,
			},
			1024: {
				perPage: 3,
			},
			1440: {
				perPage: 4,
				drag: false,
			}
		}
	})

	createSwiper("#opening-neo-2", {
		perPage: 1,
		padding: "var(--container-padding)",
		gap: 10,

		breakpoints: {
			768: {
				perPage: 2,
				gap: 22,
			},
			1024: {
				perPage: 3,
			},
			1440: {
				perPage: 4,
				drag: false,
			}
		}
	})

	createSwiper("#drug-types-splide", {
		perPage: 1,
		padding: "var(--container-padding)",
		gap: 10,

		breakpoints: {
			768: {
				perPage: 2,
				drag: false,
				gap: 20,
			},
		}
	})
}());