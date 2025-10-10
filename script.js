// Basic interactivity: mobile nav toggle, smooth scroll, skill bar animation, modal, contact form feedback.
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav
  const toggle = document.getElementById('nav-toggle');
  const nav = document.querySelector('.nav-links');
  toggle && toggle.addEventListener('click', () => nav.classList.toggle('open'));

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav if open
        nav.classList.remove('open');
      }
    });
  });

  // Animate skill bars
  const fills = document.querySelectorAll('.fill');
  const animateFills = () => {
    fills.forEach(f => {
      const val = f.getAttribute('data-fill') || 60;
      f.style.width = val + '%';
    });
  };
  // Trigger when the skills section is in view
  const skillsSection = document.querySelector('#skills');
  if ('IntersectionObserver' in window && skillsSection) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateFills();
          io.disconnect();
        }
      });
    }, {threshold:0.25});
    io.observe(skillsSection);
  } else {
    animateFills();
  }

  // Project modal
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const closeBtns = document.querySelectorAll('.modal-close, #modal-close2');

  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      modalTitle.textContent = btn.dataset.title;
      modalDesc.textContent = btn.dataset.desc;
      modal.classList.add('show');
      modal.setAttribute('aria-hidden','false');
    });
  });

  closeBtns.forEach(b => b.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
  }));

  // Close modal on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden','true');
    }
  });

  // Contact form — simple demo feedback
  const contactForm = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');
  const sendBtn = document.getElementById('send-btn');

  if (contactForm) {
    sendBtn.addEventListener('click', () => {
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      if (!name || !email) {
        formMsg.textContent = 'Please fill name & email.';
        formMsg.style.color = '#ff6b6b';
        return;
      }
      // This is a demo UX only — you can wire this to an API or mail service.
      formMsg.style.color = '';
      formMsg.textContent = `Thanks ${name}! I will get back to you at ${email}.`;
      // Clear after brief delay
      setTimeout(()=> {
        contactForm.reset();
      }, 900);
    });
  }

});
