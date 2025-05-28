import "./header.js";

async function loadModules() {
	if (document.querySelector(".splide")) {
		await import("./libs/splide.min.js")
		await import("./sliders.js");
	}

	if (document.querySelector(".slide-show")) {
		import("./slide-show.js");
	}

	if (document.querySelector(".tab-select")) {
		import("./tab-select.js");
	}

	if (document.querySelector(".tab-system")) {
		import("./tabs.js");
	}

	if (document.querySelector(".accordion")) {
		import("./accordion.js");
	}

	if (document.querySelector(".warning")) {
		import("./warning.js");
	}

	if (document.querySelector(".component_start-loader")) {
		import("./start-loader.js");
	}
}

// Запускаем после загрузки DOM
document.addEventListener("DOMContentLoaded", loadModules);