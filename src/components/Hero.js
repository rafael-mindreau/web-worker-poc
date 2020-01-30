export default () => {
  const hero = document.createElement('div');
  hero.className = 'hero';
  hero.innerHTML = `
    <p class="banner-text">Demonstrating Web Workers: Assigning CPU-intensive work to a separate thread</p>
  `;
  document.body.appendChild(hero);
};
