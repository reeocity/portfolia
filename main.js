// ---------- Theme ----------
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle?.querySelector("i");

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch (e) {
    /* storage unavailable — theme just won't persist */
  }
  if (themeToggle && themeIcon) {
    const isDark = theme === "dark";
    themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
    themeToggle.setAttribute("aria-pressed", String(!isDark));
  }
}

applyTheme(document.documentElement.dataset.theme || "dark");

themeToggle?.addEventListener("click", () => {
  const next =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
});

// ---------- Mobile nav ----------
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

function setNav(open) {
  navToggle?.setAttribute("aria-expanded", String(open));
  navLinks?.classList.toggle("open", open);
}

navToggle?.addEventListener("click", () => {
  setNav(navToggle.getAttribute("aria-expanded") !== "true");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setNav(false));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setNav(false);
});

// ---------- Navbar + back-to-top on scroll ----------
const navbar = document.querySelector(".navbar");
const backToTop = document.querySelector(".back-to-top");

function onScroll() {
  navbar?.classList.toggle("scrolled", window.scrollY > 24);
  backToTop?.classList.toggle("visible", window.scrollY > 600);
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------- Active nav link via IntersectionObserver ----------
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((a) =>
          a.classList.toggle(
            "active",
            a.getAttribute("href") === `#${entry.target.id}`
          )
        );
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => sectionObserver.observe(s));
}

// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// ---------- Rotating hero role ----------
const roles = [
  "scalable web applications",
  "real-time experiences",
  "clean REST APIs",
  "modern React interfaces",
];
const roleEl = document.getElementById("typed-role");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (roleEl && roles.length > 1 && !reduceMotion) {
  let roleIndex = 0;
  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleEl.style.opacity = "0";
    setTimeout(() => {
      roleEl.textContent = roles[roleIndex];
      roleEl.style.opacity = "1";
    }, 250);
  }, 3200);
  roleEl.style.transition = "opacity 0.25s ease";
}

// ---------- Footer year ----------
const yearSpan = document.getElementById("current-year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ---------- Contact form (opens the visitor's mail app) ----------
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:ibraheemreedwan100@gmail.com?subject=${subject}&body=${body}`;

  if (formStatus) {
    formStatus.textContent =
      "Opening your email app — I'll get back to you soon.";
    formStatus.className = "form-status success";
  }
  contactForm.reset();
});

// ---------- Custom cursor (fine pointers only) ----------
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

if (finePointer.matches && cursor && cursorRing && !reduceMotion) {
  let x = -100;
  let y = -100;
  let ringX = x;
  let ringY = y;

  document.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
    cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  });

  (function followRing() {
    ringX += (x - ringX) * 0.16;
    ringY += (y - ringY) * 0.16;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(followRing);
  })();

  document
    .querySelectorAll("a, button, summary, input, textarea")
    .forEach((el) => {
      el.addEventListener("mouseenter", () =>
        cursorRing.classList.add("is-hovering")
      );
      el.addEventListener("mouseleave", () =>
        cursorRing.classList.remove("is-hovering")
      );
    });
}
