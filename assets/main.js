(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('[data-nav-toggle]');
  var panel = document.querySelector('[data-nav-panel]');

  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      var open = panel.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-open', open);
    });
    panel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        panel.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      });
    });
  }

  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    el.classList.add('reveal-pending');
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  var back = document.querySelector('[data-back-top]');
  if (back) {
    back.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.querySelectorAll('[data-accordion]').forEach(function (root) {
    root.querySelectorAll('[data-accordion-item]').forEach(function (item) {
      var btn = item.querySelector('[data-accordion-trigger]');
      var body = item.querySelector('[data-accordion-body]');
      if (!btn || !body) return;
      btn.addEventListener('click', function () {
        var expanded = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        if (expanded) {
          body.style.maxHeight = body.scrollHeight + 'px';
        } else {
          body.style.maxHeight = '0px';
        }
      });
    });
  });

  var form = document.querySelector('[data-contact-form]');
  if (form) {
    var ok = document.querySelector('[data-form-success]');
    var err = document.querySelector('[data-form-error]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (ok) ok.hidden = true;
      if (err) err.hidden = true;
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          if (ok) ok.hidden = false;
          form.reset();
        } else {
          if (err) err.hidden = false;
        }
      }).catch(function () {
        if (err) err.hidden = false;
      });
    });
  }
})();
