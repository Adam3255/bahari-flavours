function updateTotal() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let total = 0;
  checkboxes.forEach(cb => {
    if (cb.checked) total += parseFloat(cb.value);
  });
  document.getElementById('total').textContent = total.toFixed(2);
}
