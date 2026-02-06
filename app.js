// year
document.getElementById("year").textContent = new Date().getFullYear();

// reveal on scroll
const els = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("is-visible");
  });
}, { threshold: 0.15 });

els.forEach(el => io.observe(el));

// depth variable (0..1) based on scroll position
function clamp01(x){ return Math.max(0, Math.min(1, x)); }
function updateDepth(){
  const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
  const d = clamp01((window.scrollY / max) * 0.95);
  document.documentElement.style.setProperty("--depth", String(d));
}
window.addEventListener("scroll", updateDepth, { passive: true });
window.addEventListener("resize", updateDepth);
updateDepth();

// ambient sound toggle (OFF by default)
const hum = document.getElementById("hum");
const toggle = document.getElementById("soundToggle");
let on = false;

toggle.addEventListener("click", async () => {
  on = !on;
  toggle.setAttribute("aria-pressed", on ? "true" : "false");

  if(on){
    try{
      hum.volume = 0.12; // subtle
      await hum.play();
      toggle.textContent = "Sound: On";
    }catch(err){
      // Autoplay restrictions: user already clicked, but some browsers still block if not allowed.
      toggle.textContent = "Sound: Blocked";
      on = false;
      toggle.setAttribute("aria-pressed", "false");
    }
  }else{
    hum.pause();
    toggle.textContent = "Sound: Off";
  }
});

// micro “dive” feel on Enter click
const enterBtn = document.getElementById("enterBtn");
enterBtn.addEventListener("click", () => {
  document.body.classList.add("dive");
  setTimeout(() => document.body.classList.remove("dive"), 700);
});
