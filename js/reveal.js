document.addEventListener("DOMContentLoaded", () => {
  // Sections that should fade in. The hero banner is skipped so it is visible immediately.
  const sections = document.querySelectorAll("main > section:not(.page-hero)");

  // If the visitor prefers reduced motion, or the browser is old, do nothing.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  const HIDDEN = ["opacity-0", "translate-y-8"];
  const SHOWN = ["opacity-100", "translate-y-0"];
  const MOTION = ["transition-all", "duration-700", "ease-out"];

  // Start every section slightly lower and invisible.
  sections.forEach((section) => {
    section.classList.add(...MOTION, ...HIDDEN);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        el.classList.remove(...HIDDEN);
        el.classList.add(...SHOWN);

        observer.unobserve(el); // animate once only
      });
    },
    {
      threshold: 0.12,                 // start when 12% of the section is visible
      rootMargin: "0px 0px -40px 0px", // trigger a little before the bottom edge
    }
  );

  sections.forEach((section) => observer.observe(section));
});