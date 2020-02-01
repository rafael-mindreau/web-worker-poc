let statusBar;

export default ({ initialPoolSize, initialWorkload }) => {
  statusBar = document.createElement('div');
  statusBar.className = "status-bar";
  statusBar.innerHTML = `
    <span id="workload" class="pill pill--color-magenta">Primes: ${initialWorkload}</span>
    <span id="pool-size" class="pill pill--color-cyan">Pool size: ${initialPoolSize}</span>
  `;
  document.body.appendChild(statusBar);
};

export const updateWorkloadPill = (value) => {
  statusBar.querySelector('#workload').innerHTML = `Primes: ${value}`;
};

export const updatePoolSizePill = (value) => {
  statusBar.querySelector('#pool-size').innerHTML = `Pool size: ${value}`;
};
