export default (result, className) => {
  const row = document.createElement('div');
  row.className = 'row';
  row.innerHTML = `
    <p>${result.length} primes found!</p>
    <button type="button" class="remove-button">Remove</button>
    <span class="indicator ${className}"></span>
  `;

  document.body.appendChild(row);

  row.querySelectorAll('button.remove-button')[0].addEventListener('click', () => {
    row.remove();
  });

  return row;
};
