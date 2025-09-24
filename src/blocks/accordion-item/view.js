const toggles = document.querySelectorAll('.AccordionItem__toggle');

for (const toggle of toggles) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', (!expanded).toString());
  });
}
