// ===== Mobile menu =====
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ===== Typing effect =====
const roles = [
  "BS Information Systems Student",
  "Aspiring Systems Analyst",
  "Web Developer",
  "Database Designer",
  "OJT Applicant"
];
const typingEl = document.querySelector(".typing");
let roleIndex = 0, charIndex = 0, deleting = false;

function type() {
  const word = roles[roleIndex];
  typingEl.textContent = word.substring(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(type, 80);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 40);
  } else {
    deleting = !deleting;
    if (!deleting) roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, deleting ? 1600 : 300);
  }
}
type();

// ===== Project filter =====
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const category = button.dataset.filter;
    projects.forEach(project => {
      const show = category === "all" || project.dataset.category === category;
      project.classList.toggle("hide", !show);
    });
  });
});

// ===== Highlight active nav link while scrolling =====
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navAnchors.forEach(a =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + current)
  );
  backToTop.classList.toggle("show", window.scrollY > 500);
});

backToTop.addEventListener("click", () => window.scrollTo({ top: 0 }));

// ===== Reveal sections on scroll =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".section, .card").forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

// ===== Contact form =====
// Opens the visitor's email app with the message pre-filled.
// EDIT: change the email below to yours.
const MY_EMAIL = "youremail@example.com";

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  const subject = encodeURIComponent("OJT Inquiry from " + form.name.value);
  const body = encodeURIComponent(form.message.value + "\n\nFrom: " + form.name.value + " (" + form.email.value + ")");
  window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
  document.getElementById("formStatus").textContent = "Opening your email app…";
  form.reset();
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
