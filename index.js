import Home from './views/pages/Home.js';
import Settings from './views/pages/Settings.js';
import Error404 from './views/pages/Error404.js';
import Quiz from './views/pages/Quiz.js';
import Result from './views/pages/Result.js';
import Categories from './views/pages/Categories.js';

import Footer from './views/components/Footer.js';

import Utils from './services/Utils.js';
import userSettings from './views/js/user_settings.js';
import userResults from './views/js/user_result.js';

const routes = {
  '/': Home,
  '/settings': Settings,
  '/quiz': Quiz,
  '/categories': Categories,
  '/result': Result,
};

async function router() {
  const content = null || document.getElementById('page_container');
  const footer = null || document.getElementById('footer_container');
  footer.innerHTML = await Footer.render();
  await Footer.after_render();
  let request = Utils.parseRequestURL();

  let parsedURL =
    (request.resource ? '/' + request.resource : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? '/' + request.verb : '');

  let page = routes[parsedURL] ? routes[parsedURL] : Error404;
  const body = document.querySelector('.body');

  if (parsedURL === '/') body.classList.add('home');
  else body.classList.remove('home');

  content.innerHTML = await page.render();
  await page.after_render();
}

window.addEventListener('hashchange', () => {
  const content = null || document.getElementById('page_container');
  content.classList.add('hide');
  setTimeout(() => router(), 300);
  setTimeout(() => content.classList.remove('hide'), 600);
});

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', router);
getLocalStorage();

function setLocalStorage() {
  localStorage.setItem('userSettings', JSON.stringify(userSettings));
  localStorage.setItem('userResults', JSON.stringify(userResults));
}

function getLocalStorage() {
  if (localStorage.getItem('userSettings')) {
    Object.assign(
      userSettings,
      JSON.parse(localStorage.getItem('userSettings'))
    );
  }
  if (localStorage.getItem('userResults')) {
    Object.assign(userResults, JSON.parse(localStorage.getItem('userResults')));
  }
}