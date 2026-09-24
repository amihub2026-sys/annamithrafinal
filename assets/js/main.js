const COMPANY = {
  phone: "+91 7373373030",
  whatsapp: "917373373030",
  email: "Annamithraagenciesmdu@gmail.com",
};
function wa(text) {
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`;
}
function shared() {
  document
    .querySelectorAll("[data-phone]")
    .forEach((a) => (a.href = "tel:" + COMPANY.phone.replace(/\s/g, "")));
  document
    .querySelectorAll("[data-wa]")
    .forEach(
      (a) =>
        (a.href = wa(
          a.dataset.message ||
            "Hello, I would like to enquire about your dairy and frozen-food products.",
        )),
    );
  [[".menu-btn", ".navlinks", "toggle"], [".filter-toggle", ".filters", "add"], [".filter-close", ".filters", "remove"]].forEach(([button, target, action]) => {
    const el = document.querySelector(button);
    if (!el || el.dataset.bound) return;
    el.dataset.bound = "true";
    el.addEventListener("click", () => document.querySelector(target)?.classList[action]("open"));
  });
  document
    .querySelectorAll("[data-year]")
    .forEach((e) => (e.textContent = new Date().getFullYear()));
}
document.addEventListener("DOMContentLoaded", shared);
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("aboutVideo");
    const soundButton = document.getElementById("aboutSoundBtn");

    if (!video || !soundButton) return;

    const soundIcon = soundButton.querySelector(".sound-icon");
    const soundText = soundButton.querySelector(".sound-text");

    soundButton.addEventListener("click", async () => {
        if (video.muted) {
            video.muted = false;
            video.volume = 1;

            try {
                await video.play();
            } catch (error) {
                console.error("Video sound error:", error);
            }

            soundButton.classList.add("sound-on");

            if (soundIcon) soundIcon.textContent = "🔇";
            if (soundText) soundText.textContent = "Mute Sound";
        } else {
            video.muted = true;

            soundButton.classList.remove("sound-on");

            if (soundIcon) soundIcon.textContent = "🔊";
            if (soundText) soundText.textContent = "Play Sound";
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {

    const animatedSections = document.querySelectorAll(
        ".company-about-section, .company-values-section"
    );

    if (!animatedSections.length) return;

    const sectionObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.2
        }
    );

    animatedSections.forEach((section) => {
        sectionObserver.observe(section);
    });

});
document.addEventListener("DOMContentLoaded", () => {

    const aboutSection = document.querySelector(".company-about-section");
    const smoke = document.querySelector(".about-cursor-smoke");

    if (!aboutSection || !smoke) return;

    let currentX = 0;
    let currentY = 0;

    let targetX = 0;
    let targetY = 0;

    aboutSection.addEventListener("mousemove", (event) => {

        const rect = aboutSection.getBoundingClientRect();

        targetX = event.clientX - rect.left;
        targetY = event.clientY - rect.top;

    });

    aboutSection.addEventListener("mouseenter", () => {
        smoke.style.opacity = "1";
    });

    aboutSection.addEventListener("mouseleave", () => {
        smoke.style.opacity = "0";
    });

    function animateSmoke() {

       currentX += (targetX - currentX) * 0.045;
currentY += (targetY - currentY) * 0.045;

        smoke.style.left = `${currentX}px`;
        smoke.style.top = `${currentY}px`;

        requestAnimationFrame(animateSmoke);
    }

    animateSmoke();

});
/* =========================================
   BRANDS — 2 ROWS + SMOOTH MOVE + PAUSE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const brandMarquee = document.querySelector(".brands-marquee");
    const brandTrack = document.querySelector(".brands-track");

    if (!brandMarquee || !brandTrack) return;

    const brandCards = Array.from(
        brandTrack.querySelectorAll(".brand-logo-card")
    );

    if (!brandCards.length) return;

    // HTML contains the same logo set twice
    const originalLogoCount = Math.floor(brandCards.length / 2);

    // Two logos are displayed in every horizontal column
    const originalColumnCount = Math.ceil(originalLogoCount / 2);

    let currentBrandIndex = 0;
    let brandTimer;


    function getBrandStep() {

        const trackStyle = window.getComputedStyle(brandTrack);

        const columnGap =
            parseFloat(trackStyle.columnGap) || 0;

        return brandCards[0].offsetWidth + columnGap;
    }


    function moveToNextBrand() {

        currentBrandIndex++;

        const distance =
            currentBrandIndex * getBrandStep();

        brandTrack.style.transform =
            `translateX(-${distance}px)`;


        // Restart after the first complete 2-row logo set
        if (currentBrandIndex >= originalColumnCount) {

            setTimeout(() => {

                brandTrack.style.transition = "none";

                currentBrandIndex = 0;

                brandTrack.style.transform = "translateX(0)";

                requestAnimationFrame(() => {

                    requestAnimationFrame(() => {

                        brandTrack.style.transition =
                            "transform 1.4s cubic-bezier(.22, 1, .36, 1)";

                    });

                });

            }, 1450);
        }
    }


    function startBrandSlider() {

        clearInterval(brandTimer);

        brandTimer = setInterval(() => {

            moveToNextBrand();

        }, 4000);
    }


    startBrandSlider();

});
// Local fallback for unavailable third-party product photographs.
document.addEventListener("error", (event) => { const img = event.target; if (img.tagName === "IMG" && !img.dataset.fallback && img.closest(".product-card, .detail-image")) { img.dataset.fallback = "true"; img.src = "assets/images/product-placeholder.svg"; } }, true);
