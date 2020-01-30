export default (result, className) => {
  const row = document.createElement('div');
  row.className = 'row';
  row.innerHTML = `
    <p>${result.length} primes found!</p>
    <span class="indicator ${className}"></span>
  `;

  document.body.appendChild(row);
  return row;
};
