document.getElementById("year").textContent = new Date().getFullYear();

const menuBtn = document.querySelector(".menu");
const nav = document.querySelector(".nav nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
  document.querySelectorAll(".nav nav a").forEach(a =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );
}

const langButtons = document.querySelectorAll("[data-lang]");
const bilingual = document.querySelectorAll("[data-en][data-ml]");

function setLanguage(lang){
  bilingual.forEach(el => {
    const value = el.getAttribute(`data-${lang}`);
    if (value !== null) el.innerHTML = value;
  });
  langButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));
  document.documentElement.lang = lang === "ml" ? "ml" : "en";
  localStorage.setItem("sularc-language", lang);
}

langButtons.forEach(btn => btn.addEventListener("click", () => setLanguage(btn.dataset.lang)));
setLanguage(localStorage.getItem("sularc-language") || "en");
// SULARC Online Library Portal
window.SULARC_PORTAL = {
  baseUrl: "https://sularc1985.pythonanywhere.com",
  paths: {
    catalogue: "/public-catalogue",
    membership: "/apply-membership",
    memberLogin: "/member-login"
  }
};

window.SULARC_PORTAL_URL = function(service) {
  const cfg = window.SULARC_PORTAL || {};
  const base = (cfg.baseUrl || "").replace(/\/+$/, "");
  const path = cfg.paths && cfg.paths[service];

  if (!base || !path) return "";
  return base + path;
};
