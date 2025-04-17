
var curSlide = 0;
var elements = document.querySelectorAll(".IMG img")
var Slides = elements.length;
var buttons = document.querySelectorAll(".Buttons button")
checkSlide(0)
function prevSlide() {
    if (curSlide == 0) {
        curSlide = Slides - 1
    }
    else {
        curSlide = curSlide - 1
    }

    HideandShow()
}

function nextSlide() {
    if (curSlide == Slides - 1) {
        curSlide = 0
    }
    else {
        curSlide = curSlide + 1;
    }

    HideandShow()
}

function checkSlide(index) {
    curSlide = index;

    HideandShow()
}

function HideandShow() {
    for (var i = 0; i < Slides; i++) {
        var slide = elements[i];
        var button = buttons[i];
        if (curSlide == i) {
            slide.style.display = "block";
            button.classList.add("active-button");
        }
        else {
            slide.style.display = "none";
            button.classList.remove("active-button");
        }
    }

}

document.addEventListener("keydown", function (e) {
    if (e.key == "ArrowRight") {
        nextSlide()
    }
    if (e.key == "ArrowLeft") {
        prevSlide()
    }
})

