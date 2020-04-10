let carouselSlideIndex = 0;

function showCarousel() {
    let allSlides = document.getElementsByClassName("carousel-slide");

    for (let i = 0; i < allSlides.length; i++) {
        allSlides[i].style.display = "none";
    }

    carouselSlideIndex++;

    if (carouselSlideIndex > allSlides.length) {
        carouselSlideIndex = 1;
    }
    allSlides[carouselSlideIndex - 1].style.display = "block";
    setTimeout(showCarousel, 3000);
};

let navbar = document.getElementById("navbar");

let sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}
window.onscroll = () => { myFunction() };
showCarousel();