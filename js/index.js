const textareaFrom = document.querySelector("#textareaFrom");
const textareaTo = document.querySelector("#textareaTo");
const btnTranslate = document.querySelector("#btnTranslate");
const btnClear = document.querySelector("#btnClear");
const selects = document.querySelectorAll("select");

const languages = {
	"en-GB": "Inglês",
	"es-ES": "Espanhol",
	"it-IT": "Italiano",
	"ja-JP": "Japonês",
	"pt-PT": "Português",
	"fr-FR": "Francês",
	"de-DE": "Alemão",
	"ru-RU": "Russo",
	"zh-CN": "Chinês",
	"zh-TW": "Chinês",
	"ko-KR": "Coreano",
	"ar-SA": "Árabe",
	"tr-TR": "Turco",
	"pl-PL": "Polonês",
	"nl-NL": "Holandês",
	"el-GR": "Grego",
	"da-DK": "Dinamarquês",
	"fi-FI": "Finlandês",
	"no-NO": "Norueguês",
	"sv-SE": "Sueco",
	"ca-ES": "Catalão",
	"cs-CZ": "Checo",
	"hu-HU": "Húngaro",
	"ro-RO": "Romeno",
	"sk-SK": "Eslovaco",
	"sl-SI": "Esloveno",
	"et-EE": "Estoniano",
	"lv-LV": "Letão",
	"lt-LT": "Lituano",
	"fa-IR": "Persa",
	"vi-VN": "Vietnamita",
	"id-ID": "Indonésio",
	"th-TH": "Tailandês",
	"bg-BG": "Búlgaro",
	"uk-UA": "Ucraniano",
	"hr-HR": "Croata",
	"sr-RS": "Sérvio",
	"mk-MK": "Macedônio",
};

document.querySelector(".colors").addEventListener("click", (e) => {
	e.target.classList.toggle("change-color");
	if (e.target.classList.contains("change-color")) {
		document.body.classList.toggle("color1");
	} else {
		document.body.classList.toggle("color2");
	}
});

selects.forEach((tag) => {
	for (let language in languages) {
		let selected;

		if (tag.className.includes("selectFrom") && language === "pt-BR") {
			selected = "selected";
		} else if (tag.className.includes("selectTo") && language === "en-GB") {
			selected = "selected";
		}

		const option = `<option value="${language}" ${selected}>${languages[language]}</option>`;

		tag.insertAdjacentHTML("beforeend", option);
	}
});

btnTranslate.addEventListener("click", () => {
	if (textareaFrom.value) {
		loadTranslation();
	} else {
		textareaTo.value = "";
	}
});

btnClear.addEventListener("click", () => {
	textareaFrom.value = "";
	textareaTo.value = "";
});

function loadTranslation() {
	fetch(
		`https://api.mymemory.translated.net/get?q=${textareaFrom.value}&langpair=${selects[0].value}|${selects[1].value}`
	)
		.then((res) => res.json())
		.then((data) => {
			textareaTo.value = data.responseData.translatedText;
		});
}
