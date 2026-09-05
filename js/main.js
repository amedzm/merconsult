const nav=document.getElementById('nav');const menu=document.querySelector('.menu');const links=document.querySelector('.links');window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40));menu.addEventListener('click',()=>links.classList.toggle('open'));document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));


// Galería de proyectos: lightbox ampliado
(() => {
  const cards = Array.from(document.querySelectorAll('.gallery-card'));
  const box = document.getElementById('project-lightbox');
  if (!cards.length || !box) return;

  const image = document.getElementById('lightbox-image');
  const category = document.getElementById('lightbox-category');
  const title = document.getElementById('lightbox-title');
  const description = document.getElementById('lightbox-description');
  const closeBtn = box.querySelector('.lightbox-close');
  const prevBtn = box.querySelector('.lightbox-prev');
  const nextBtn = box.querySelector('.lightbox-next');
  let current = 0;
  let lastFocus = null;

  const render = (index) => {
    current = (index + cards.length) % cards.length;
    const card = cards[current];
    const img = card.querySelector('img');
    const fig = card.querySelector('figcaption');
    image.src = img.currentSrc || img.src;
    image.alt = img.alt || '';
    category.textContent = fig?.querySelector('span')?.textContent || '';
    title.textContent = fig?.querySelector('h3')?.textContent || img.alt || '';
    description.textContent = fig?.querySelector('p')?.textContent || '';
  };

  const open = (index) => {
    lastFocus = document.activeElement;
    render(index);
    box.classList.add('open');
    box.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
  };

  const close = () => {
    box.classList.remove('open');
    box.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    image.src = '';
    if (lastFocus) lastFocus.focus();
  };

  cards.forEach((card, index) => {
    card.addEventListener('click', () => open(index));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(index);
      }
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => render(current - 1));
  nextBtn.addEventListener('click', () => render(current + 1));
  box.addEventListener('click', (e) => { if (e.target === box) close(); });

  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') render(current - 1);
    if (e.key === 'ArrowRight') render(current + 1);
  });
})();
