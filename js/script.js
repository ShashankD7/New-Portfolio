/* ═══════════════════════════════════════════
   Shashank Deshpande — Portfolio JS
   Vanilla JavaScript, no dependencies
   ═══════════════════════════════════════════ */

(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ─── Footer year ─── */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* ─── Navbar: scrolled state + mobile menu ─── */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    hamburger.addEventListener('click', () => {
        const open = mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', open);
    });
    mobileMenu.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        })
    );

    /* ─── Scroll progress bar ─── */
    const progress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const h = document.documentElement;
        const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        progress.style.width = pct + '%';
    }, { passive: true });

    /* ─── Cursor spotlight ─── */
    const spotlight = document.querySelector('.spotlight');
    if (spotlight && !prefersReducedMotion) {
        window.addEventListener('mousemove', (e) => {
            spotlight.style.setProperty('--mx', e.clientX + 'px');
            spotlight.style.setProperty('--my', e.clientY + 'px');
        }, { passive: true });
    }

    /* ─── Typewriter ─── */
    const typedEl = document.getElementById('typed');
    if (typedEl) {
        const titles = ['Full Stack Developer', 'Laravel Expert', 'React.js Developer', 'API Architect', 'Problem Solver'];
        let i = 0, char = 0, deleting = false;

        function tick() {
            const word = titles[i];
            if (!deleting) {
                char++;
                typedEl.textContent = word.substring(0, char);
                if (char === word.length) {
                    deleting = true;
                    return setTimeout(tick, 1800);
                }
                setTimeout(tick, 80);
            } else {
                char--;
                typedEl.textContent = word.substring(0, char);
                if (char === 0) {
                    deleting = false;
                    i = (i + 1) % titles.length;
                    return setTimeout(tick, 350);
                }
                setTimeout(tick, 40);
            }
        }
        if (prefersReducedMotion) {
            typedEl.textContent = titles[0];
        } else {
            setTimeout(tick, 900);
        }
    }

    /* ─── Particle canvas (hero) ─── */
    const canvas = document.getElementById('particles');
    if (canvas && !prefersReducedMotion) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let w, h;

        function resize() {
            const hero = canvas.parentElement;
            w = canvas.width = hero.offsetWidth;
            h = canvas.height = hero.offsetHeight;
        }

        function init() {
            resize();
            const count = Math.min(Math.floor(w / 18), 80);
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.6 + 0.4,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                o: Math.random() * 0.5 + 0.15
            }));
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);
            for (const p of particles) {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(56, 189, 248, ${p.o})`;
                ctx.fill();
            }
            // connect close particles
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.strokeStyle = `rgba(56, 189, 248, ${0.08 * (1 - dist / 110)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(draw);
        }

        init();
        draw();
        window.addEventListener('resize', init, { passive: true });
    }

    /* ─── Scroll reveal ─── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                revealObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ─── Animated counters ─── */
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const target = parseInt(el.dataset.target, 10);
            const dur = 1200;
            const start = performance.now();
            function step(now) {
                const t = Math.min((now - start) / dur, 1);
                el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
                if (t < 1) requestAnimationFrame(step);
            }
            prefersReducedMotion ? (el.textContent = target) : requestAnimationFrame(step);
            counterObserver.unobserve(el);
        });
    }, { threshold: 0.6 });
    document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

    /* ─── Active nav link on scroll ─── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                navLinks.forEach(l =>
                    l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id)
                );
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => sectionObserver.observe(s));

    /* ─── 3D tilt on cards ─── */
    if (!prefersReducedMotion && matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.tilt').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    /* ─── Magnetic buttons ─── */
    if (!prefersReducedMotion && matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const r = btn.getBoundingClientRect();
                const x = e.clientX - r.left - r.width / 2;
                const y = e.clientY - r.top - r.height / 2;
                btn.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    /* ─── Contact form (FormSubmit.co — works on static hosting) ───
       First submission to a new email triggers a one-time activation
       email from FormSubmit. Click the link in it once, and all
       future submissions arrive in your inbox automatically. */
    const FORM_ENDPOINT = 'https://formsubmit.co/ajax/dsash223340@gmail.com';

    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');
    const sendIcon = submitBtn.querySelector('.send-icon');

    function setLoading(loading) {
        submitBtn.disabled = loading;
        spinner.hidden = !loading;
        sendIcon.hidden = loading;
        btnText.textContent = loading ? 'Sending...' : 'Send Message';
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        formError.hidden = true;

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        setLoading(true);

        const payload = {
            name: form.querySelector('#f-name').value.trim(),
            email: form.querySelector('#f-email').value.trim(),
            _subject: 'Portfolio: ' + form.querySelector('#f-subject').value.trim(),
            message: form.querySelector('#f-message').value.trim(),
            _template: 'table',
            _captcha: 'false'
        };

        try {
            const res = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();

            if (res.ok && (data.success === 'true' || data.success === true)) {
                form.reset();
                form.hidden = true;
                formSuccess.hidden = false;
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (err) {
            formError.textContent = 'Failed to send message. Please email me directly at shashankdeshpande94@gmail.com';
            formError.hidden = false;
        }

        setLoading(false);
    });

    document.getElementById('sendAnother').addEventListener('click', () => {
        formSuccess.hidden = true;
        form.hidden = false;
    });

})();
