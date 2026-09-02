/* ==========================================
   MOBILE NAVIGATION
========================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("show");

    });

}


/* ==========================================
   SCROLL REVEAL ANIMATION
========================================== */

const revealElements =
    document.querySelectorAll(".reveal");


function revealOnScroll() {

    revealElements.forEach((element) => {

        const windowHeight =
            window.innerHeight;

        const elementTop =
            element.getBoundingClientRect().top;

        const revealPoint = 120;


        if (
            elementTop <
            windowHeight - revealPoint
        ) {

            element.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    revealOnScroll
);


/* Run when page loads */

window.addEventListener(
    "load",
    revealOnScroll
);


/* ==========================================
   CONTACT FORM DEMO
========================================== */

const contactForm =
    document.querySelector(".contact-form");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            alert(
                "Thank you for your message! The form is currently in demo mode."
            );

        }
    );

}