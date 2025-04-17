document.addEventListener("DOMContentLoaded", function () {
	// Mouseover
	var gColor = "#1bbfa2";

	var topLinks = document.querySelectorAll(".navi a");

	topLinks[0].style.color = gColor;
	topLinks[5].style.color = gColor;

	for (var i = 0; i <= 5; i++) {
		topLinks[i].addEventListener("mouseover", function (e) {
			e.target.style.color = gColor;
		});

		topLinks[i].addEventListener("mouseout", function (e) {
			e.target.style.color = "black";
		});
	}

	// Navigation
	topLinks[1].addEventListener("click", function () {
		var aboutMe = document.getElementById("about-me");

		var coord = aboutMe.getBoundingClientRect();

		var scrollTo = coord.top + window.pageYOffset;

		window.scrollTo({
			top: scrollTo,
			behavior: "smooth"
		});
	});

	topLinks[2].addEventListener("click", function () {
		var help = document.getElementById("help");

		var coord = help.getBoundingClientRect();

		var scrollTo = coord.top + window.pageYOffset;

		window.scrollTo({
			top: scrollTo,
			behavior: "smooth"
		});
	})

	topLinks[5].addEventListener("click", function () {
		var contact = document.getElementById("contact");

		var coord = contact.getBoundingClientRect();

		var scrollTo = coord.top + window.pageYOffset;

		window.scrollTo({
			top: scrollTo,
			behavior: "smooth"
		});
	});

	topLinks[4].addEventListener("click", function () {
		var contact = document.getElementById("contact");

		var coord = contact.getBoundingClientRect();

		var scrollTo = coord.top + window.pageYOffset;

		window.scrollTo({
			top: scrollTo,
			behavior: "smooth"
		});
	});



	
	// Form validation
	document.getElementById("contact-form").addEventListener("submit", formValidation);
});

async function formValidation(e) {
	e.preventDefault();

	// fehler weg

	var valid = true;

	var inputName = document.getElementById("form-name");
	var inputNameValue = inputName.value;

	if (inputNameValue.length < 3) {
		inputName.style.borderColor = "red";
		document.getElementById("name-less-than-3").style.display = "block";
		valid = false;
	}
	else if (inputNameValue.includes(" ") == false) {
		inputName.style.borderColor = "red";
		document.getElementById("name-without-surname").style.display = "block";
		valid = false;
	}
	else if (inputNameValue.length > 50) {
		inputName.style.borderColor = "red";
		document.getElementById("name-bigger-than-50").style.display = "block";
		valid = false;
	}


	var inputEmail = document.getElementById("form-Email");
	var inputEmailValue = inputEmail.value;

	if (inputEmailValue.includes(" ") == true) {
		inputEmail.style.borderColor = "red";
		document.getElementById("Email-with-Space").style.display = "block";
		valid = false;
	}
	else if (inputEmailValue.includes("@") == false) {
		inputEmail.style.borderColor = "red";
		document.getElementById("Email-without-dog").style.display = "block";
		valid = false;
	}
	else if (inputEmailValue.includes(".com") == false) {
		inputEmail.style.borderColor = "red";
		document.getElementById("Email-without-.com").style.display = "block";
		valid = false;
	}



	var inputBetreff = document.getElementById("form-Betreff");
	var inputBetreffValue = inputBetreff.value;

	if (inputBetreffValue.length < 5) {
		inputBetreff.style.borderColor = "red";
		document.getElementById("Betreff-to-short").style.display = "block";
		valid = false;
	}
	else if (inputBetreffValue.length > 100) {
		inputBetreff.style.borderColor = "red";
		document.getElementById("Betreff-to-long").style.display = "block";
		valid = false;
	}



	var inputText = document.getElementById("form-Text");
	var inputTextValue = inputText.value;

	if (inputTextValue.length < 50) {
		inputText.style.borderColor = "red";
		document.getElementById("Text-to-short").style.display = "Block";
		valid = false;
	}
	else if (inputTextValue.length > 500) {
		inputText.style.borderColor = "red";
		document.getElementById("Text-to-long").style.display = "Block";
		valid = false;
	}


	if (valid) {

		var formData = new FormData();
		formData.append("Name", inputNameValue);
		formData.append("Email", inputEmailValue);
		formData.append("Topic", inputBetreffValue);
		formData.append("Message", inputTextValue);

		var response = await fetch("http://localhost:5293/Home/Form", {
			method: "POST",
			body: formData,
		});

		if (response.ok == true) {
			document.getElementById("Danke").style.display = "flex";
		}
		else {
			alert("Something went wrong!");
		}
	}
}

function closeWindow() {
	document.getElementById("Danke").style.display = "none";
	location.reload();

}