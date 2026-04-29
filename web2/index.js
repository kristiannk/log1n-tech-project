import { Analytics } from "@vercel/analytics/next"
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("top-header");
  const navLinks = Array.from(document.querySelectorAll(".nav-menu a[href^='#']"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const updateHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  const activateClosestSection = () => {
    const offset = window.innerHeight * 0.35;
    let activeSection = sections[0];

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top - offset <= 0) {
        activeSection = section;
      }
    }

    if (activeSection) {
      setActiveLink(activeSection.id);
    }
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href").slice(1);
      setActiveLink(targetId);
    });
  });

  window.addEventListener("scroll", () => {
    updateHeaderState();
    activateClosestSection();
  }, { passive: true });

  window.addEventListener("resize", activateClosestSection);

  updateHeaderState();
  activateClosestSection();
});
