export default ({
  addToMain,
  addAsSeparate,
  changePrimesToCalculate,
}) => {
  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'controls-container';
  controlsContainer.innerHTML = `
    <h2>Workload</h2>
    <input id="primes-slider" min="10" max="800000" class="slider" type="range" value="10" />
    <h2>Schedule work</h2>
    <div class="controls-container">
      <button id="button-add-to-main-thread" class="add-button add-button--color-blue">+ MAIN THREAD</button>
      <button id="button-add-to-separate-thread" class="add-button add-button--color-green">+ NEW THREAD </button>
    </div>
  `;

  document.body.appendChild(controlsContainer);

  document.getElementById('primes-slider').addEventListener('change', (event) => {
    const { value } = event.target;
    changePrimesToCalculate(value);
  });
  document.getElementById('button-add-to-main-thread').addEventListener('click', () => {
    addToMain();
  });
  document.getElementById('button-add-to-separate-thread').addEventListener('click', () => {
    addAsSeparate();
  });
};
