function showHide(element_id) {
    var obj = document.getElementById(element_id); 
    //Если css-свойство display не block, то: 
    if (obj.style.display != "block")
    { 
        obj.style.display = "block"; //Показываем элемент
    }
    else obj.style.display = "none"; //Скрываем элемент
}   