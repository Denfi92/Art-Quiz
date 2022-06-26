import userSettings from '../js/user_settings.js';
import userResults from '../js/user_result.js';

let Result = {
  render: async () => {
    return `
  <header class="header results-header">
  <div class="menu-container">
    <a class="link" href="/#/">
      <div class="quiz-logo"></div>
    </a>
    <a class="link" href="/#/categories">
      <p>Categories</p>
    </a>
  </div>
  <a class="settings-link" href="/#/settings">
    <div class="settings btn" aria-label="settings"></div>
  </a>
</header>
<main class="main results-main">
  <div class="results-container"></div>
</main>
        `;
  },

  after_render: async () => {
    const resultsContainer = document.querySelector('.results-container');
    async function getInfo() {
      const imgData = '../../images.json';
      const res = await fetch(imgData);
      const data = await res.json();
      return data;
    }
    getInfo().then((result) => {
      if (userSettings.gameType === 'picture') {
        for (let i = 0; i < 10; i++) {
          const newDiv = document.createElement('div');
          newDiv.innerHTML = `<div class="result-info"><h3>${
            result[userSettings.category * 10 + 120 + i].name
          }<br>${result[userSettings.category * 10 + 120 + i].author}, ${
            result[userSettings.category * 10 + 120 + i].year
          }</h3></div>`;
          newDiv.style.backgroundImage = `url("../../image-data/img/${
            Number(userSettings.category) * 10 + 120 + i
          }.jpg")`;
          if (!userResults[Number(userSettings.category) + 12][i])
            newDiv.classList.add('wrong-result');
          newDiv.classList.add('picture-result');
          resultsContainer.append(newDiv);
        }
      }
      if (userSettings.gameType === 'artist') {
        for (let i = 0; i < 10; i++) {
          const newDiv = document.createElement('div');
          newDiv.innerHTML = `<div class="result-info"><h3>${
            result[userSettings.category * 10 + i].name
          }<br>${result[userSettings.category * 10 + i].author}, ${
            result[userSettings.category * 10 + i].year
          }</h3></div>`;
          newDiv.style.backgroundImage = `url("../../image-data/img/${
            Number(userSettings.category) * 10 + i
          }.jpg")`;
          if (!userResults[userSettings.category][i])
            newDiv.classList.add('wrong-result');
          newDiv.classList.add('picture-result');
          resultsContainer.append(newDiv);
        }
      }
    });
  },
};

export default Result;
