document.addEventListener('DOMContentLoaded', function () {
  const formContainer = document.getElementById('formContainer');
  const printBlankFormButton = document.getElementById('printBlankForm');

  function preparePrintVersion(isBlank = false) {
    const clone = formContainer.cloneNode(true);
    clone.querySelectorAll('input, textarea').forEach((input) => {
      if (isBlank) {
        input.placeholder = '';
      } else {
        const value = input.value ? input.value : '____________________';
        const replacement = document.createElement('span');
        replacement.textContent = value;
        replacement.style.display = 'inline-block';
        replacement.style.minWidth = '150px';
        replacement.style.borderBottom = '1px solid #000';
        input.parentNode.replaceChild(replacement, input);
      }
    });

    clone.querySelectorAll('button').forEach((button) => button.remove());
    document.body.innerHTML = '';
    document.body.appendChild(clone);

    window.print();

    window.location.reload();
  }

  document
    .getElementById('warningForm')
    .addEventListener('submit', function (event) {
      event.preventDefault();
      preparePrintVersion();
    });

  printBlankFormButton.addEventListener('click', function () {
    preparePrintVersion(true);
  });
});
