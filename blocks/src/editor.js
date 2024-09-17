document.addEventListener('DOMContentLoaded', () => {
  const { protocol, origin } = location;

  if (protocol === 'blob:') {
    const styles = document.querySelectorAll('body > style');

    for (const style of styles) {
      if (style.innerHTML.includes('url(/')) {
        style.innerHTML = style.innerHTML.replaceAll('url(/', `url(${origin}/`);
      }
    }
  }
});
