/**
 * For a given Worker ID, publish the eventual results
 * @param  {Number} id        The id for the work to be published to
 * @param  {Array}  result    The results that should be published
 * @param  {Number} time      The time it took to perform the work
 */
export const publish = (id, result, time) => {
  const row = document.getElementById(id);

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'remove-button';
  deleteButton.innerHTML = 'Remove';

  const timePill = document.createElement('span');
  timePill.className = 'pill pill--color-yellow';
  timePill.innerHTML = `${time}s`;

  row.appendChild(deleteButton);
  row.querySelector('div.content').appendChild(timePill);

  row.querySelector('div.content p').innerHTML = `Calculated ${result.length} primes`;
  row.querySelectorAll('button.remove-button')[0].addEventListener('click', () => {
    row.remove();
  });
};

/**
 * Announces some work that is to be performed (but not started yet)
 * Requires you to identify this with the worker's ID
 * Will display a row in the list that is "busy doing work"
 * @param  {Number} id A unique identifier for the work
 * @param  {String} workType  The type of work, used as a class
 */
export const announce = (id, workType) => {
  const row = document.createElement('div');
  row.className = 'row';
  row.id = id;
  row.innerHTML = `
    <h1>${id}</h1>
    <div class="content">
      <p>Crunching data...</p>
    </div>
    <span class="indicator ${workType}"></span>
  `;

  document.body.appendChild(row);

  return row;
}
