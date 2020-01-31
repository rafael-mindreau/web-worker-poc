export default ({
  addToMain,
  addAsSeparate,
  changePrimesToCalculate,
}) => {
  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'controls-container';
  controlsContainer.innerHTML = `
    <h2>Workload</h2>
    <input id="primes-slider" min="0" max="1600000" step="1000" class="slider" type="range" value="0" />
    <h2>Schedule work</h2>
    <div class="controls-container">
      <button id="button-add-to-main-thread" class="add-button add-button--color-blue">+ MAIN THREAD</button>
      <button id="button-add-to-separate-thread" class="add-button add-button--color-green">+ NEW THREAD </button>
    </div>
  `;

  document.body.appendChild(controlsContainer);

  document.getElementById('primes-slider').addEventListener('change', (event) => {
    const { value } = event.target;

    if (value > 1000000) {
      document.getElementById('primes-slider').classList.add('high-load');
    } else {
      document.getElementById('primes-slider').classList.remove('high-load');
    }

    changePrimesToCalculate(value);
  });
  document.getElementById('button-add-to-main-thread').addEventListener('click', () => {
    addToMain();
  });
  document.getElementById('button-add-to-separate-thread').addEventListener('click', () => {
    addAsSeparate();
  });
};
