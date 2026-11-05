document.getElementById('ano').textContent = new Date().getFullYear();

// digitação do terminal (linhas reveladas uma a uma; sem animação se o usuário prefere menos movimento)
(function () {
  const linhas = Array.from(document.querySelectorAll('#term p'));
  const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduz || !linhas.length) return;
  linhas.forEach(l => { l.style.visibility = 'hidden'; });
  let i = 0;
  const prox = () => {
    if (i >= linhas.length) return;
    const l = linhas[i++];
    l.style.visibility = 'visible';
    const ehComando = l.querySelector('.cmd');
    setTimeout(prox, ehComando ? 420 : 320);
  };
  setTimeout(prox, 350);
})();

// aparecer ao rolar
const alvos = document.querySelectorAll('.block, .avatar, .log article, .project');
alvos.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entradas) => {
    entradas.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  alvos.forEach(el => io.observe(el));
} else {
  alvos.forEach(el => el.classList.add('in'));
}

// copiar e-mail
const btn = document.getElementById('copiar');
if (btn) {
  btn.addEventListener('click', async () => {
    const email = document.querySelector('.mail').textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      btn.textContent = 'copiado ✓';
    } catch (e) {
      btn.textContent = 'selecione e copie';
    }
    setTimeout(() => { btn.textContent = 'copiar'; }, 1800);
  });
}