Sumb_forms = new Array();
Sumb_forms = [false,false, false, false];

function ValidName() {
	var myName = document.getElementById("name").value;
	if (isNaN(myName)){
		document.getElementById('name').className='correct';
		Sumb_forms[0] = true;
	}
	else{
		document.getElementById('name').className='not_correct';
		Sumb_forms[0] = false;
	}
}

function ValidPhone(){
	var myPhone = document.getElementById("tel").value;

	if (isNaN(myPhone)){
		var re = /^[\+38]+[\d\(\)\ -]{17}\d$/;
		var myPhone = document.getElementById('tel').value;
		var valid = re.test(myPhone);
		if (valid){
			document.getElementById('tel').className='correct';
			Sumb_forms[1] = true;
		}
		else{
			document.getElementById('tel').className='not_correct';
			Sumb_forms[1] = false;
		}
	}
	else{
		document.getElementById('tel').className='not_correct';
		Sumb_forms[1] = false;
	}
}

function ValidMail() {
	var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
	var myMail = document.getElementById('email').value;
	var valid = re.test(myMail);
	if (valid){
		document.getElementById('email').className='correct';
		Sumb_forms[2] = true;
	}
	else{
		document.getElementById('email').className='not_correct';
		Sumb_forms[2] = false;
	}
}

function ValidText() {
	var myText = document.getElementById("coment").value;
	if (isNaN(myText)){
		document.getElementById('coment').className='correct';
		Sumb_forms[3] = true;
	}
	else{
		document.getElementById('coment').className='not_correct';
		Sumb_forms[3] = false;
	}
}


window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+38 (___) __ __ ___",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});



function checkform()
{	
	var cansubmit = false;

	for (var i = 0; i < Sumb_forms.length; i++){
		if (Sumb_forms[i] == true){
			cansubmit = true;
		}
		else{
			cansubmit = false;
			break;
		}	
	}

    if (cansubmit) {
        document.getElementById('submitbutton').disabled = false;
        document.getElementById('submitbutton').className='can_submit';
    }
    else{
    	document.getElementById('submitbutton').disabled = true;
		document.getElementById('submitbutton').className='cant_submit';
    }
}

function jump(elmnt,content)
{

document.addEventListener('keyup', function(event) {

	if (event.keyCode == 13)
	    {
	        next=elmnt.tabIndex+1;
	        document.MyForm.elements[next].focus();
	    }
	});
}



function length_check(event) {
	if (event=='focus'){
		document.getElementById('counter').className='counter_visible';
	}
	if (event=='blur'){
		document.getElementById('counter').className='counter';
	}
	if (event=='typing'){
		var len_current = document.getElementById('coment').value.length;
		document.getElementById('counter').firstChild.data = 162 - len_current;
	}
    
}

var lines = 1;
function limitLines(obj){
	if(event.keyCode == 13){
		if(lines == obj.rows){
			return false;
		}
		else{
			lines++;
		}
	}
	if(event.keyCode == 8){
		var mass = obj.value.split('');
		if (mass[mass.length-1] == "\n")
		{
			lines--;
		}
		if (lines == 1)
		{
			return true;
		}
	}
}