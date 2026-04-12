function hotkey(event) {
	if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)){
		alert('Отменить!');
	}
	if (event.keyCode === 49){
		document.getElementById("key_menu").scrollIntoView();
	}
	if (event.keyCode === 50){
		document.getElementById("key").scrollIntoView();
	}		
}