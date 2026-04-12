window.onload = _=>{
	const userName_el = document.querySelector("#display_gamename")
	const main_button = document.querySelector("#main_button")
	const name_input = document.querySelector("#gamename")

	name_input.oninput = e=>{
		const value = e.target.value.trim()
		userName_el.textContent = value
		if (value == ""){
			main_button.classList.remove("visible")
		} else {
			main_button.classList.add("visible")
		}
	}
	name_input.onkeydown = e=>{
		if (e.keyCode == 13){
			main_button.click()
		}
	}
	main_button.onclick = _=>{
		document.querySelector("#label").classList.add("hide")
		main_button.classList.remove("visible")
		userName_el.classList.add("big")
		const audio = new Audio('src/music.mp3')
		setTimeout(_=>{
			document.querySelector("#left_page").classList.add("close")
		}, 1000)
		setTimeout(_=>{
			audio.play()
		}, 1500)
	}
}
