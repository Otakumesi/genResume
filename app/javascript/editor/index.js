import mountApp from './lib/mount-app';

document.addEventListener("DOMContentLoaded", e => {
  const el = document.getElementById('editor');
  mountApp(el);
});
