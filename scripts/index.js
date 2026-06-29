
    const masthead = document.getElementById('masthead');
    const onScroll = () => masthead.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

 
    const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
        if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
        }
    }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    document.querySelectorAll('.frame').forEach(el => io.observe(el));


    const lb = document.getElementById('lightbox');
    const lbImg = lb.querySelector('img');
    const lbMeta = lb.querySelector('.lb-meta');

    document.querySelectorAll('.photo[data-lb-src]').forEach(p => {
    p.addEventListener('click', () => {
        lbImg.src = p.dataset.lbSrc;
        lbMeta.textContent = p.dataset.lbMeta || '';
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
    });

    const close = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; }, 300);
    };
    lb.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb.classList.contains('open')) close();
    });