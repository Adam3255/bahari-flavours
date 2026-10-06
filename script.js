function updateTotal() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let total = 0;
  checkboxes.forEach(cb => {
    if (cb.checked) total += parseFloat(cb.value);
  });
  document.getElementById('total').textContent = total.toFixed(2);
}

function updateOrder() {
  updateTotal();

  const picks = document.querySelectorAll('input.pick:checked');
  const list = document.getElementById('selected-list');
  const empty = document.getElementById('selected-empty');
  const naNote = document.getElementById('na-note');
  const field = document.getElementById('selected-items');
  const notes = document.querySelector('textarea[name="products"]');

  list.innerHTML = '';
  const lines = [];
  let hasNA = false;

  picks.forEach(cb => {
    const text = cb.dataset.label + ' - ' + cb.dataset.display;
    const li = document.createElement('li');
    li.textContent = text;
    list.appendChild(li);
    lines.push(text);
    if (cb.dataset.display === 'N/A') hasNA = true;
  });

  empty.style.display = picks.length ? 'none' : 'block';
  naNote.style.display = hasNA ? 'block' : 'none';

  if (picks.length) {
    lines.push('Total: $' + document.getElementById('total').textContent);
  }
  field.value = lines.join('\n');

  notes.required = picks.length === 0;
}

document.querySelectorAll('.price-list tbody tr').forEach(row => {
  row.addEventListener('click', e => {
    const cb = row.querySelector('input.pick');
    if (e.target !== cb) {
      cb.checked = !cb.checked;
      updateOrder();
    }
  });
});

document.querySelectorAll('input.pick').forEach(cb => {
  cb.addEventListener('change', updateOrder);
});

updateOrder();
