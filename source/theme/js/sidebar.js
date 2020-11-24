import { enhance } from './utils';

const animate = ({ from, to, duration, easeFn, cb }) => {
  const delta = to - from;
  const tStart = Date.now();
  const tEnd = tStart + duration;
  const fn = () => {
    const tNow = Date.now();
    const progress = (tNow - tStart) / duration;
    cb(from + easeFn(progress) * delta);

    if (tNow < tEnd) {
      requestAnimationFrame(() => fn());
    } else {
      cb(to);
    }
  };

  requestAnimationFrame(() => fn());
};

const easeIn = t => t ** 2;

const scrollToSection = event => {
  const offset = 100;

  const target = document.querySelector(event.target.getAttribute('href'));
  const from =
    window.pageYOffset ||
    (document.documentElement || document.body.parentNode || document.body).scrollTop;
  const to = target.getBoundingClientRect().top + from - offset;

  animate({
    from,
    to,
    duration: 600,
    easeFn: easeIn,
    cb: v => {
      document.body.scrollTop = v;
      // This line is needed for IE11
      document.body.parentNode.scrollTop = v;
      // This line is needed for Firefox because it doesn't scroll the document.body.
      // And we can't remove the line above because although Safari and Chrome recognize
      // the document.documentElement they are unable to scroll it.
      document.documentElement.scrollTop = v;
    },
  });
};

const toggleSidebarGroup = event => {
  event.target.parentNode.parentNode.classList.toggle('sidebar__group--collapse');
};

export default enhance('sidebar', () => {
  const links = document.querySelectorAll('.sidebar__inner .current a, a.headerlink');
  [].forEach.call(links, link => {
    link.addEventListener('click', scrollToSection);
  });

  const groupHeaders = document.querySelectorAll('.sidebar__group > p > a');
  [].forEach.call(groupHeaders, groupHeader => {
    groupHeader.addEventListener('click', toggleSidebarGroup);
  });
});
