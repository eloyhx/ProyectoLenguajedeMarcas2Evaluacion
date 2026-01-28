
document.addEventListener('DOMContentLoaded', () => {
  const offcanvas = document.getElementById('offcanvasCar');

  if (!offcanvas) return;

  offcanvas.addEventListener('show.bs.offcanvas', (e) => {
    const b = e.relatedTarget;
    if (!b) return;

    document.getElementById('offcanvasTitle').textContent = b.dataset.title;
    document.querySelector('#offcanvasVideo source').src = b.dataset.video;
    document.getElementById('offcanvasVideo').load();
    document.getElementById('offcanvasDesc').textContent = b.dataset.desc;

    const list = document.getElementById('offcanvasSpecs');
    list.innerHTML = '';
    b.dataset.specs.split('|').forEach(s => {
      const li = document.createElement('li');
      li.className = 'list-group-item bg-dark text-white';
      li.textContent = s;
      list.appendChild(li);
    });
  });
});
