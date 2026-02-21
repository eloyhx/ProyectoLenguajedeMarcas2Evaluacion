// Datos de modelos disponibles
const vehiculos = [
  { nombre: "Lamborghini Aventador SVJ", marca: "Lamborghini", id: "aventador" },
  { nombre: "Bugatti Chiron", marca: "Bugatti", id: "chiron" },
  { nombre: "Ferrari F8 Tributo", marca: "Ferrari", id: "f8tributo" },
  { nombre: "McLaren 720S", marca: "McLaren", id: "720s" },
  { nombre: "Pagani Huayra", marca: "Pagani", id: "huayra" },
  { nombre: "Koenigsegg Jesko", marca: "Koenigsegg", id: "jesko" }
];

// Mapeo de IDs a secciones en la página
const enlacesModelos = {
  aventador: "#lamborghini-aventador",
  chiron: "#bugatti-chiron",
  f8tributo: "#ferrari-f8",
  "720s": "#mclaren-720s",
  huayra: "#pagani-huayra",
  jesko: "#koenigsegg-jesko"
};

function norm(t) {
  return (t || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector(".nav-search");
  const searchInput = document.querySelector(".nav-search-input");
  if (!searchForm || !searchInput) return;

  // Datalist (incluye modelos + marcas)
  let datalist = document.getElementById("vehiculos-list");
  if (!datalist) {
    datalist = document.createElement("datalist");
    datalist.id = "vehiculos-list";

    // modelos
    vehiculos.forEach((v) => {
      const option = document.createElement("option");
      option.value = v.nombre;
      datalist.appendChild(option);
    });

    // marcas únicas
    [...new Set(vehiculos.map((v) => v.marca))].forEach((m) => {
      const option = document.createElement("option");
      option.value = m;
      datalist.appendChild(option);
    });

    document.body.appendChild(datalist);
  }
  searchInput.setAttribute("list", "vehiculos-list");

  function irAResultados(valorRaw) {
    const valor = norm(valorRaw);
    if (!valor) return;

    // 1) Match exacto por modelo (cuando eliges del datalist)
    const exacto = vehiculos.find((v) => norm(v.nombre) === valor);
    if (exacto && enlacesModelos[exacto.id]) {
      document.querySelector(enlacesModelos[exacto.id])?.scrollIntoView({ behavior: "smooth" });
      searchInput.value = "";
      return;
    }

    // 2) Si escriben una marca (Ferrari), baja a la sección de marcas
    const marcaExiste = vehiculos.some((v) => norm(v.marca) === valor);
    if (marcaExiste) {
      const seccionMarcas = document.querySelector(".brand-card")?.closest("section");
      seccionMarcas?.scrollIntoView({ behavior: "smooth" });
      searchInput.value = "";
      return;
    }

    // 3) Búsqueda por palabra (parcial): "ferr", "trib", "720"
    const parcial = vehiculos.find((v) => norm(v.nombre).includes(valor) || norm(v.marca).includes(valor));
    if (parcial && enlacesModelos[parcial.id]) {
      document.querySelector(enlacesModelos[parcial.id])?.scrollIntoView({ behavior: "smooth" });
      searchInput.value = "";
      return;
    }
  }

  // Buscar al pulsar Enter
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    irAResultados(searchInput.value);
  });

  // También buscar cuando el usuario elige algo del datalist
  searchInput.addEventListener("change", () => {
    irAResultados(searchInput.value);
  });
});