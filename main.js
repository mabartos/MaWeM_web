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

function getAllSectionsInNavbar() {
    let items = document.getElementsByTagName("li");
    let sections = [];
    for (let i = 0; i < items.length; i++) {
        let children = items[i].children;
        sections.push(children[0].hash);
    }
    return sections;
}

let prevIndex = 0;
let activeIndex = 0;

function changeActivityOfNavbarItems() {
    let items = getAllSectionsInNavbar();
    let navItems = document.getElementsByTagName("li");

    for (let i = 0; i < items.length; i++) {
        let item = document.getElementById(items[i].substr(1));
        let offset = item.offsetTop;
        if (window.pageYOffset >= offset - 200) {
            activeIndex = i;
        }
    }

    if (window.pageYOffset <= 300) {
        activeIndex = 0;
    }

    if (prevIndex != activeIndex) {
        navItems[activeIndex].classList.add("active");
        navItems[prevIndex].classList.remove("active");
        prevIndex = activeIndex;
    }
}

let isOpen;

function handleCloseDialog() {
    let mobileNav = document.getElementById("mobileNav");
    mobileNav.style.display = "none";
    isOpen = false;
}

function handleShowBurger() {
    let mobileNav = document.getElementById("mobileNav");
    if (!isOpen) {
        showExitDialog();
        mobileNav.style.display = "block";
        isOpen = true;
    } else {
        handleCloseDialog();
    }
}

function checkIfCanExitDialog() {
    if (isOpen) {
        showExitDialog();
    }
}

function isCarouselPresent() {
    let sectionNews = document.getElementById("section-news");
    return window.pageYOffset <= sectionNews.offsetTop - 30;
}

function showExitDialog() {
    let showExitDialog = document.getElementById("closeDialog");
    if (isCarouselPresent()) {
        showExitDialog.style.display = "block";
        navbar.classList.remove("sticky");
    } else {
        showExitDialog.style.display = "none";
        navbar.classList.add("sticky");
    }
}

window.onscroll = () => {
    showExitDialog();
    checkIfCanExitDialog();
    changeActivityOfNavbarItems();
};

showCarousel();