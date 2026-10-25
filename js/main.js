document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '×' : '☰';
    });
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const postcodeForm = document.getElementById('postcode-form');
  if (postcodeForm) {
    postcodeForm.addEventListener('submit', event => {
      event.preventDefault();
      const value = document.getElementById('postcode').value.trim().toUpperCase().replace(/\s+/g, '');
      const result = document.getElementById('postcode-result');
      const pattern = /^(?:[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2})$/;
      if (!pattern.test(value)) {
        result.textContent = 'Enter a valid UK postcode format, such as SW1A 1AA.';
        return;
      }
      // Deliberately fictional service areas; never real availability data.
      const demoAreas = ['SW1A', 'EC1A', 'M1', 'B1'];
      const supported = demoAreas.some(prefix => value.startsWith(prefix));
      result.textContent = supported
        ? 'Demo result: Sample fibre coverage is available in this fictional service area.'
        : 'Demo result: This postcode is outside our sample coverage list.';
    });
  }
});
