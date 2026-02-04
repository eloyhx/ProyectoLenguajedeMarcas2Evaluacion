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
  "aventador": "#lamborghini-aventador",
  "chiron": "#bugatti-chiron",
  "f8tributo": "#ferrari-f8",
  "720s": "#mclaren-720s",
  "huayra": "#pagani-huayra",
  "jesko": "#koenigsegg-jesko"
};

// Manejador del formulario de búsqueda
document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.querySelector('.nav-search');
  const searchInput = document.querySelector('.nav-search-input');

  if (searchForm && searchInput) {
    // Crear datalist si no existe
    if (!document.getElementById('vehiculos-list')) {
      const datalist = document.createElement('datalist');
      datalist.id = 'vehiculos-list';
      
      vehiculos.forEach(vehiculo => {
        const option = document.createElement('option');
        option.value = vehiculo.nombre;
        datalist.appendChild(option);
      });
      
      document.body.appendChild(datalist);
    }
    
    // Vincular el input al datalist
    searchInput.setAttribute('list', 'vehiculos-list');

    // Manejador para cuando se selecciona una opción
    searchInput.addEventListener('change', function() {
      const valor = this.value.trim();
      
      if (valor === '') return;

      // Buscar el vehículo
      const vehiculoEncontrado = vehiculos.find(v => 
        v.nombre.toLowerCase() === valor.toLowerCase()
      );

      if (vehiculoEncontrado) {
        // Limpiar el input
        this.value = '';

        // Si es un modelo específico, desplazarse a él
        if (enlacesModelos[vehiculoEncontrado.id]) {
          const elemento = document.querySelector(enlacesModelos[vehiculoEncontrado.id]);
          if (elemento) {
            elemento.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          // Si es una marca, desplazarse a la sección de marcas
          const seccionMarcas = document.querySelector('section:has(.brand-card)');
          if (seccionMarcas) {
            seccionMarcas.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });

    // Prevenir el envío del formulario por defecto
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
    });
  }
});
