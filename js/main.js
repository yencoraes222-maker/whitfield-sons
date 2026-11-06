// Whitfield & Sons – landingspagina
(() => {
  // Video: speelt automatisch (zonder geluid), met pauzeknop. Bij "minder beweging" start hij niet vanzelf.
  const video = document.getElementById('film');
  const btn = document.querySelector('.pause');
  if (video && btn) {
    const ico = btn.querySelector('.ico');
    const lbl = btn.querySelector('.lbl');
    const PAUSE = '<svg width="14" height="14" viewBox="0 0 16 16"><rect x="3" y="2" width="3.5" height="12" rx="1" fill="currentColor"/><rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="currentColor"/></svg>';
    const PLAY = '<svg width="14" height="14" viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z" fill="currentColor"/></svg>';
    const sync = () => {
      const playing = !video.paused;
      ico.innerHTML = playing ? PAUSE : PLAY;
      lbl.textContent = playing ? 'Video pauzeren' : 'Video afspelen';
      btn.setAttribute('aria-pressed', String(!playing));
    };
    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.muted = true;
      const p = video.play();
      if (p) p.catch(() => {});
    } else {
      video.pause();
    }
    btn.addEventListener('click', () => (video.paused ? video.play() : video.pause()));
    sync();
  }

  // Mobiel menu
  const toggle = document.querySelector('.menu-toggle');
  const panel = document.getElementById('menu');
  if (toggle && panel) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      panel.classList.toggle('open', open);
      if (open) panel.querySelector('a').focus();
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    panel.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('open')) { setOpen(false); toggle.focus(); }
    });
  }
})();
