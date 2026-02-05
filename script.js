const cards = Array.from(document.querySelectorAll(".pokemon-card"));
const detalle = document.getElementById("detalle");
let indiceActual = 0;

/* Apertura */
function abrir(i) {
  const card = cards[i];
  indiceActual = i;

  document.getElementById("detalle-img").src =
    card.querySelector("img").src;

  document.getElementById("detalle-nombre").textContent =
    card.querySelector("h2").textContent;

  document.getElementById("detalle-servicio").innerHTML =
    card.querySelector(".stats").innerHTML;

  document.getElementById("detalle-texto").textContent =
    card.dataset.largo;

  document.getElementById("detalle-movimiento").innerHTML =
    "<strong>Movimiento especial:</strong> " + card.dataset.movimiento;

  const tipos = card.querySelector(".types").cloneNode(true);
  const cont = document.getElementById("detalle-tipos");
  cont.innerHTML = "";
  cont.appendChild(tipos);

  detalle.classList.remove("oculto");
}

/* Cierre */
function cerrarDetalle() {
  detalle.classList.add("oculto");
}

/* Navegación */
function siguiente() {
  abrir((indiceActual + 1) % cards.length);
}

function anterior() {
  abrir((indiceActual - 1 + cards.length) % cards.length);
}

/* Click */
cards.forEach((card, i) => {
  card.addEventListener("click", () => abrir(i));
});

/* Teclado */
document.addEventListener("keydown", (e) => {
  if (detalle.classList.contains("oculto")) return;
  if (e.key === "Escape") cerrarDetalle();
  if (e.key === "ArrowRight") siguiente();
  if (e.key === "ArrowLeft") anterior();
});

/* Swipe en móvil */
let startX = 0;
let startY = 0;

const detalleCard = document.querySelector(".detalle-card");

detalleCard.addEventListener("touchstart", (e) => {
  const t = e.touches[0];
  startX = t.clientX;
  startY = t.clientY;
}, { passive: true });

detalleCard.addEventListener("touchend", (e) => {
  const t = e.changedTouches[0];
  const diffX = t.clientX - startX;
  const diffY = t.clientY - startY;

  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    diffX < 0 ? siguiente() : anterior();
  }
}, { passive: true });
