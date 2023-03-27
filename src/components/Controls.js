import './Controls.css';

export default ({
  addToMain,
  addAsSeparate,
  changePrimesToCalculate,
}) => {
  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'controls-container';
  controlsContainer.innerHTML = `
    <h2>Primes</h2>
    <div class="controls">
      <input id="primes-slider" min="0" max="1600000" step="1000" class="slider" type="range" value="0" />
      <input id="primes-number" min="0" max="1600000" type="number" value="0" />
    </div>
    <h2>Schedule work</h2>
    <div class="controls">
      <button id="button-add-to-main-thread" class="add-button add-button--color-blue">+ MAIN THREAD</button>
      <button id="button-add-to-separate-thread" class="add-button add-button--color-green">+ NEW THREAD </button>
    </div>
  `;

  document.body.appendChild(controlsContainer);

  const changePrimes = (event) => {
    const { value } = event.target;

    document.getElementById('primes-slider').value = value;
    document.getElementById('primes-number').value = value;

    if (value > 1000000) {
      document.getElementById('primes-slider').classList.add('high-load');
    } else {
      document.getElementById('primes-slider').classList.remove('high-load');
    }

    changePrimesToCalculate(value);
  }

  document.getElementById('primes-slider').addEventListener('change', changePrimes);
  document.getElementById('primes-number').addEventListener('change', changePrimes);

  document.getElementById('button-add-to-main-thread').addEventListener('click', () => {
    addToMain();
  });
  document.getElementById('button-add-to-separate-thread').addEventListener('click', () => {
    addAsSeparate();
  });
};
