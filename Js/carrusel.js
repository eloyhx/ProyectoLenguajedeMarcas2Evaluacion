document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel-3d');
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.carousel-card');

  if (!carousel || !track || cards.length === 0) return;

  const total = cards.length;
  const step = 360 / total;
  const radius = 420;
  let rotation = 0;

  cards.forEach((card, i) => {
    card.style.transform = `
      translate(-50%, -50%)
      rotateY(${step * i}deg)
      translateZ(${radius}px)
    `;
  });

  function setActive() {
    const index = ((-rotation / step) % total + total) % total;
    cards.forEach((c, i) =>
      c.classList.toggle('active', i === Math.round(index))
    );
  }

  document.getElementById('next').onclick = () => {
    rotation -= step;
    track.style.transform = `rotateY(${rotation}deg)`;
    setActive();
  };

  document.getElementById('prev').onclick = () => {
    rotation += step;
    track.style.transform = `rotateY(${rotation}deg)`;
    setActive();
  };

  setActive();
});
