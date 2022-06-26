import userSettings from '../js/user_settings.js';

let Categories = {
  render: async () => {
    return `
      <header class="header categories-header">
        <a class="link" href="/#/">
          <div class="quiz-logo"></div>
        </a>
        <a class="settings-link" href="/#/settings">
          <div class="settings btn" aria-label="settings"></div>
        </a>
      </header>
      <main class="main categories-main">
        <div class="categories-container"></div>
      </main>
        `;
  },
  after_render: async () => {
    let promise = new Promise((resolve, reject) => {
      const categoriesContainer = document.querySelector(
        '.categories-container'
      );
      if (userSettings.gameType === 'picture') {
        for (let i = 0; i < 12; i++) {
          const newDiv = document.createElement('div');
          if (userSettings.picturesResults[i] !== null) {
            newDiv.innerHTML = `<a href="/#/result" class="category-name-link link"><p class="category category-name" aria-label="${i}">Category ${
              i + 1
            } &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: ${
              userSettings.picturesResults[i]
            }/10</p></a><a href="/#/quiz"><img class="category category-img played" src="../assets/images/picture${
              i + 1
            }.jpg" aria-label="${i}" alt="category${i + 1}"></img></a>`;
          } else {
            newDiv.innerHTML = `<p class="category category-name" aria-label="${i}">Category ${
              i + 1
            }</p><a href="/#/quiz"><img class="category category-img new-category" src="../assets/images/picture${
              i + 1
            }.jpg" aria-label="${i}" alt="category${i + 1}"></img></a>`;
          }
          categoriesContainer.append(newDiv);
        }
      } else {
        for (let i = 0; i < 12; i++) {
          const newDiv = document.createElement('div');
          if (userSettings.artistsResults[i] !== null) {
            newDiv.innerHTML = `<a href="/#/result" class="category-name-link link"><p class="category category-name" aria-label="${i}">Category ${
              i + 1
            } &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Result: ${
              userSettings.artistsResults[i]
            }/10</p></a><a href="/#/quiz"><img class="category category-img played" src="../assets/images/artist${
              i + 1
            }.jpg" aria-label="${i}" alt="category${i + 1}"></img></a>`;
          } else {
            newDiv.innerHTML = `<p class="category category-name" aria-label="${i}">Category ${
              i + 1
            }</p><a href="/#/quiz"><img class="category category-img new-category" src="../assets/images/artist${
              i + 1
            }.jpg" aria-label="${i}" alt="category${i + 1}"></img></a>`;
          }
          categoriesContainer.append(newDiv);
        }
      }
      resolve(categoriesContainer.querySelectorAll('.category'));
    });
    const categories = await promise;
    categories.forEach((el) => {
      el.addEventListener('click', function (el) {
        userSettings.category = el.target.ariaLabel;
      });
    });
  },
};

export default Categories;
