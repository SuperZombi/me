function link(link){
	var Name = 'сторонний сайт';
	if (link == "https://www.youtube.com/channel/UC-IScET926i5vUJ5dLC9a8Q")
	{
		Name = 'YouTube';
	}
	if (link == "https://ru.wikipedia.org/wiki/%D0%98%D1%81%D0%BA%D1%83%D1%81%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9_%D0%B8%D0%BD%D1%82%D0%B5%D0%BB%D0%BB%D0%B5%D0%BA%D1%82")
	{
		Name = 'Wikipedia';
	}

	if (confirm("Перейти на " + Name + "?"))
	{
	window.open(link);
	}
}