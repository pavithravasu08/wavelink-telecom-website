
        var header = document.getElementById("header");
        var menuBtn = document.getElementById("menuBtn");
        var mobileMenu = document.getElementById("mobileMenu");
        var mobileLinks = document.querySelectorAll(".mobile-link");

        menuBtn.addEventListener("click", function () {
            if (mobileMenu.classList.contains("hidden")) {
                mobileMenu.classList.remove("hidden");
                menuBtn.textContent = "✕";
            } else {
                mobileMenu.classList.add("hidden");
                menuBtn.textContent = "☰";
            }
        });

        for (let i = 0; i < mobileLinks.length; i++) {
            mobileLinks[i].addEventListener("click", function () {
                mobileMenu.classList.add("hidden");
                menuBtn.textContent = "☰";
            });
        }

        window.addEventListener("scroll", function () {
            if (window.scrollY > 10) {
                header.classList.add("shadow-md");
            } else {
                header.classList.remove("shadow-md");
            }
        });
