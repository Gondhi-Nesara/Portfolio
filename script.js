const canvas = document.getElementById("cosmic-bg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();

let stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2,
    speed: Math.random() * 0.3 + 0.1
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(127,90,240,0.3)";

  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();

    s.y += s.speed;
    if (s.y > canvas.height) s.y = 0;
  });

  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", resize);

/* Disable right-click */
document.addEventListener("contextmenu", e => e.preventDefault());

/* Disable copy shortcuts */
document.addEventListener("keydown", e => {
  if (
    (e.ctrlKey && (e.key === "c" || e.key === "u" || e.key === "s")) ||
    (e.ctrlKey && e.shiftKey && e.key === "i")
  ) {
    e.preventDefault();
  }
});

/* Highlight active navbar item */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
