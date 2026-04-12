window.onload = _=>{
	localize()
	let count = 0
	document.querySelector(".checkbox").onclick = _=>{
		document.querySelector(".checkbox").classList.add("active")
		document.querySelector(".animation").classList.remove("hide")
		setTimeout(_=>{
			document.querySelector(".animation").classList.add("hide")
			document.querySelector(".checkbox").classList.remove("active")
			count+=1
			if (count >= 2){
				window.location.href = "https://neal.fun/not-a-robot/"
			}
		}, 5000)
	}
}
function localize(){
	const LANG = {
		"title": {
			"en": "Confirmation",
			"ru": "Подтверждение",
			"uk": "Підтвердження"
		},
		"captcha_title": {
			"en": "Confirm that you are human",
			"ru": "Подтвердите, что вы человек",
			"uk": "Підтвердіть, що ви людина"
		},
		"captcha_main_text": {
			"en": "I'm not a robot",
			"ru": "Я не робот",
			"uk": "Я не робот"
		}
	}
	const supported = ["en", "ru", "uk"]
	const userLang = navigator.language.slice(0, 2).toLowerCase()
	const lang = supported.includes(userLang) ? userLang : "en"
	
	document.title = LANG.title[lang]
	document.querySelector(".captcha-title").textContent = LANG.captcha_title[lang]
	document.querySelector(".captcha-main-text").textContent = LANG.captcha_main_text[lang]
}
