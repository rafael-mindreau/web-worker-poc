/**
 * For a given Worker ID, publish the eventual results
 * @param  {Number} id        The id for the work to be published to
 * @param  {Array}  result    The results that should be published
 */
export const publish = (id, result) => {
  const row = document.getElementById(id);
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'remove-button';
  deleteButton.innerHTML = 'Remove';

  row.appendChild(deleteButton);

  row.querySelector('p').innerHTML = `Calculated ${result.length} primes`;
  row.querySelectorAll('button.remove-button')[0].addEventListener('click', () => {
    row.remove();
  });
};

/**
 * Announces some work that is to be performed (but not started yet)
 * Requires you to identify this with the worker's ID
 * @param  {Number} id A unique identifier for the work
 * @param  {String} workType  The type of work, used as a class
 */
export const announce = (id, workType) => {
  const row = document.createElement('div');
  row.className = 'row';
  row.id = id;
  row.innerHTML = `
    <p>Crunching data...</p>
    <span class="indicator ${workType}"></span>
  `;

  document.body.appendChild(row);

  return row;
}
