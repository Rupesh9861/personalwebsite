/* =========================================
   SITE CONFIGURATION
========================================= */

const SITE_CONFIG = {

    socials: {

        linkedin: "https://www.linkedin.com/in/rupace/",

               facebook: "https://www.facebook.com/acharyarupesh9861",

        instagram: "https://www.instagram.com/rupace_acharya/"

    }

};


/* =========================================
   DOM READY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    initNavigation();

    initTheme();

    initScrollProgress();

    initRevealAnimations();

    initBackToTop();

    initSocialLinks();

    initContactForm();

    initGallery();

    updateYear();

});


/* =========================================
   LOADER
========================================= */

function initLoader() {

    const loader = document.getElementById("loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hidden");

        }, 500);

    });

}


/* =========================================
   MOBILE NAVIGATION
========================================= */

function initNavigation() {

    const toggle = document.getElementById("menuToggle");

    const menu = document.getElementById("navMenu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {

        menu.classList.toggle("open");

        const icon = toggle.querySelector("i");

        if (!icon) return;

        if (menu.classList.contains("open")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });


    menu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("open");

            const icon = toggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        });

    });

}


/* =========================================
   DARK / LIGHT MODE
========================================= */

function initTheme() {

    const toggle = document.getElementById("themeToggle");

    if (!toggle) return;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    }

    updateThemeIcon();


    toggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

        updateThemeIcon();

    });

}


function updateThemeIcon() {

    const toggle = document.getElementById("themeToggle");

    if (!toggle) return;

    const icon = toggle.querySelector("i");

    if (!icon) return;

    const isDark =
        document.body.classList.contains("dark-mode");

    icon.classList.toggle("fa-sun", isDark);

    icon.classList.toggle("fa-moon", !isDark);

}


/* =========================================
   SCROLL PROGRESS
========================================= */

function initScrollProgress() {

    const progress =
        document.getElementById("scrollProgress");

    if (!progress) return;

    window.addEventListener("scroll", () => {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        progress.style.width =
            `${percentage}%`;

    });

}


/* =========================================
   REVEAL ANIMATIONS
========================================= */

function initRevealAnimations() {

    const elements =
        document.querySelectorAll(".reveal");

    if (!elements.length) return;

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================
   BACK TO TOP
========================================= */

function initBackToTop() {

    const button =
        document.getElementById("backToTop");

    if (!button) return;

    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================
   CURRENT YEAR
========================================= */

function updateYear() {

    const year =
        document.getElementById("currentYear");

    if (!year) return;

    year.textContent =
        new Date().getFullYear();

}


/* =========================================
   SOCIAL MEDIA LINKS
========================================= */

function initSocialLinks() {

    document
        .querySelectorAll("[data-social]")
        .forEach(link => {

            const platform =
                link.dataset.social;

            const url =
                SITE_CONFIG.socials[platform];

            if (url && url !== "#") {

                link.href = url;

                link.target = "_blank";

                link.rel =
                    "noopener noreferrer";

            }

        });

}


/* =========================================
   CONTACT FORM
========================================= */

function initContactForm() {

    const form =
        document.getElementById("contactForm");

    const status =
        document.getElementById("formStatus");

    if (!form || !status) return;


    form.addEventListener("submit", async event => {

        event.preventDefault();


        const submitButton =
            form.querySelector(".submit-btn");

        const originalHTML =
            submitButton.innerHTML;


        status.textContent =
            "Sending your message...";

        status.className =
            "form-status";


        submitButton.disabled = true;

        submitButton.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Sending...';


        try {

            const response =
                await fetch(
                    form.action,
                    {
                        method: "POST",

                        body: new FormData(form),

                        headers: {
                            "Accept":
                                "application/json"
                        }
                    }
                );


            if (response.ok) {

                status.textContent =
                    "Thank you! Your message has been sent successfully.";

                status.className =
                    "form-status success";

                form.reset();

            } else {

                throw new Error(
                    "Unable to send message."
                );

            }

        } catch (error) {

            status.textContent =
                "Something went wrong. Please try again later.";

            status.className =
                "form-status error";

        }


        submitButton.disabled = false;

        submitButton.innerHTML =
            originalHTML;

    });

}


/* =========================================
   GALLERY LIGHTBOX
========================================= */

function initGallery() {

    const items =
        document.querySelectorAll(".gallery-item img");

    const lightbox =
        document.getElementById("lightbox");

    const image =
        document.getElementById("lightboxImage");

    const caption =
        document.getElementById("lightboxText");

    const counter =
        document.getElementById("lightboxCounter");

    const close =
        document.getElementById("lightboxClose");

    const previous =
        document.getElementById("lightboxPrev");

    const next =
        document.getElementById("lightboxNext");


    if (
        !items.length ||
        !lightbox ||
        !image
    ) return;


    let currentIndex = 0;


    const images =
        Array.from(items);


    function showImage(index) {

        currentIndex =
            (index + images.length) %
            images.length;


        const selected =
            images[currentIndex];


        image.src =
            selected.src;

        image.alt =
            selected.alt || "";


        caption.textContent =
            selected.dataset.caption ||
            selected.alt ||
            "";


        counter.textContent =
            `${currentIndex + 1} / ${images.length}`;

    }


    function openLightbox(index) {

        showImage(index);

        lightbox.classList.add("active");

        document.body.style.overflow =
            "hidden";

    }


    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.style.overflow =
            "";

    }


    images.forEach((item, index) => {

        item.addEventListener("click", () => {

            openLightbox(index);

        });

    });


    if (close) {

        close.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (previous) {

        previous.addEventListener(
            "click",
            () => showImage(currentIndex - 1)
        );

    }


    if (next) {

        next.addEventListener(
            "click",
            () => showImage(currentIndex + 1)
        );

    }


    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    document.addEventListener("keydown", event => {

        if (!lightbox.classList.contains("active"))
            return;


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowLeft") {

            showImage(currentIndex - 1);

        }


        if (event.key === "ArrowRight") {

            showImage(currentIndex + 1);

        }

    });

}