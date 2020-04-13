let carouselSlideIndex = 0;

// Card slide on intro page
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

// Helping function to get all 'li' elements from navbar
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

// Change activity of the navbar items; scrolling
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

// Close mobile dialog
function handleCloseDialog() {
    let mobileNav = document.getElementById("mobileNav");
    mobileNav.style.display = "none";
    isOpen = false;
}

// Mobile menu burger
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

// If user scrolls in mobile version on the top, then the cancel button will appear.
function checkIfCanExitDialog() {
    if (isOpen) {
        showExitDialog();
    }
}

// Check if carousel is present on the current view.
function isCarouselPresent() {
    let sectionNews = document.getElementById("section-news");
    return window.pageYOffset <= sectionNews.offsetTop - 30;
}

// Mobile version - show cancel button
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