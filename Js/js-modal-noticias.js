document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalNoticia');

  if (!modal) return;

  modal.addEventListener('show.bs.modal', (e) => {
    const b = e.relatedTarget;
    if (!b) return;

    document.getElementById('modalTitle').textContent =
      b.dataset.title || 'Noticia';

    document.getElementById('modalDate').textContent =
      b.dataset.date || '';

    document.getElementById('modalTag').textContent =
      b.dataset.tag || 'Actualidad';

    const img = document.getElementById('modalImg');
    img.src = b.dataset.img || '';
    img.style.display = img.src ? 'block' : 'none';

    document.getElementById('modalContent').textContent =
      b.dataset.content || '';
  });
});
