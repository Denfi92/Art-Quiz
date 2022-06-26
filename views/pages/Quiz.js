import userSettings from '../js/user_settings.js';
import Game from '../js/game.js';
import userResults from '../js/user_result.js';

let Quiz = {
  render: async () => {
    if (userSettings.gameType === 'artist')
      return `
        <header class="header quiz-header">
  <div class="menu-container">
    <a class="link" href="/#/">
      <div class="quiz-logo"></div>
    </a>
    <a class="link" href="/#/categories"><p>Categories</p></a>
  </div>
  <a class="settings-link" href="/#/settings">
    <div class="settings btn" aria-label="settings"></div>
  </a>
</header>
<main class="main quiz-main">
  <div class="time-container">
    <div class="close btn" onClick="history.go(-1);"></div>
    <div id="progress" class="progressbar">
      <div
        class="progressbar-inner inner"
        style="animation-duration: ${userSettings.answerTime}s;"
      ></div>
    </div>
    <p id="time">0:${userSettings.answerTime}</p>
  </div>
  <div class="artist-picture"></div>
  <div class="artist-answers">
    <button class="button artist-button"></button>
    <button class="button artist-button"></button>
    <button class="button artist-button"></button>
    <button class="button artist-button"></button>
  </div>
  <div class="popup">
    <div class="popup-body">
      <div class="popup-content">
        <div class="popup-picture"><div class="icon"></div></div>
        <h3 class="picture-title"></h3>
        <p class="picture-info"></p>
        <button class="button popup-button">Далее</button>
      </div>
    </div>
  </div>
</main>
        `;
    else
      return `
<header class="header quiz-header">
  <div class="menu-container">
    <a class="link" href="/#/">
      <div class="quiz-logo"></div>
    </a>
    <a class="link" href="/#/categories"><p>Categories</p></a>
  </div>
  <a class="settings-link" href="/#/settings">
    <div class="settings btn" aria-label="settings"></div>
  </a>
</header>
<main class="main quiz-main">
  <div class="time-container">
    <div class="close btn" onClick="history.go(-1);"></div>
    <div id="progress" class="progressbar">
      <div
        class="progressbar-inner inner"
        style="animation-duration: ${userSettings.answerTime}s;"
      ></div>
    </div>
    <p id="time">0:${userSettings.answerTime}</p>
  </div>
  <h3 class="picture-question"></h3>
  <div class="picture-answers">
    <div class="picture-image"><div class="indicator"></div></div>
    <div class="picture-image"><div class="indicator"></div></div>
    <div class="picture-image"><div class="indicator"></div></div>
    <div class="picture-image"><div class="indicator"></div></div>
  </div>
  <div class="popup">
    <div class="popup-body">
      <div class="popup-content">
        <div class="popup-picture"><div class="icon"></div></div>
        <h3 class="picture-title"></h3>
        <p class="picture-info"></p>
        <button class="button popup-button">Далее</button>
      </div>
    </div>
  </div>
</main>
        
        `;
  },
  after_render: async () => {
    const popup = document.querySelector('.popup');
    const popupPicture = document.querySelector('.popup-picture');
    const nextBtn = document.querySelector('.popup-button');
    const popupContent = document.querySelector('.popup-content');
    const progressbarinner = document.querySelector('.progressbar-inner');
    const time = document.getElementById('time');
    const timeContainer = document.querySelector('.time-container');
    const title = document.querySelector('.picture-title');
    const info = document.querySelector('.picture-info');
    const icon = document.querySelector('.icon');

    if (!userSettings.isTimeGame) timeContainer.classList.add('hidden');
    function popupOpen() {
      popup.classList.add('open');
    }

    function popupClose() {
      popup.classList.remove('open');
    }

    const game = new Game(userSettings.gameType, userSettings.category);
    game.updateQuestionNum();

    if (userSettings.gameType === 'picture') {
      userResults[Number(userSettings.category) + 12] = [];
      userSettings.picturesResults[game.category] = 0;
      const pictures = document.querySelectorAll('.picture-image');
      const question = document.querySelector('.picture-question');
      nextBtn.addEventListener('click', function () {
        pictures.forEach((el) => {
          el.firstChild.classList.remove('indicator-right');
          el.firstChild.classList.remove('indicator-wrong');
          progressbarinner.classList.remove('inner');
          time.textContent = `0:${userSettings.answerTime
            .toString()
            .padStart(2, '0')}`;
        });
        if (icon.classList.contains('icon-right')) {
          userSettings.picturesResults[game.category] += 1;
          userResults[Number(userSettings.category) + 12].push(true);
          game.updateScore();
        } else {
          userResults[Number(userSettings.category) + 12].push(false);
        }
        if (game.current < game.length - 1) {
          popupClose();
          game.next();
          setTimeout(() => {
            showPictures();
          }, 900);
        } else {
          const gameoverSound = new Audio('./assets/sounds/end.mp3');
          gameoverSound.volume = userSettings.volume;
          gameoverSound.play();
          popupContent.innerHTML = `<div class="gameover-picture"></div>
        <h3>Game over</h3>
        <p>${game.score}/10</p>
        <a href="/#/result">
        <button class="button gameover-button">Результат</button></a>`;
        }
      });

      showPictures();
      function showPictures() {
        icon.classList.remove('icon-right');
        icon.classList.remove('icon-wrong');
        progressbarinner.classList.add('inner');
        progressbarinner.style.animationPlayState = 'running';
        progressbarinner.addEventListener('animationend', function () {
          if (userSettings.isTimeGame) {
            const sound = new Audio('./assets/sounds/wrong.mp3');
            sound.volume = userSettings.volume;
            sound.play();
            icon.classList.add('icon-wrong');
            popupOpen();
          }
        });
        let counter = userSettings.answerTime - 1;
        const intervalId = setInterval(() => {
          time.textContent = `0:${counter.toString().padStart(2, '0')}`;
          counter -= 1;
          if (counter == -1) {
            clearInterval(intervalId);
          }
        }, 1000);

        game.getAnswers().then((result) => {
          let arr = [0, 1, 2, 3];
          arr.sort(() => Math.random() - 0.5);
          const img = new Image();
          img.src = result[0];
          img.onload = () => {
            pictures[arr[0]].style.backgroundImage = `url(${img.src})`;
            popupPicture.style.backgroundImage = `url(${img.src})`;
          };
          pictures[arr[0]].ariaLabel = 'right';

          for (let i = 1; i < 4; i++) {
            const img = new Image();
            img.src = result[i];
            img.onload = () => {
              pictures[arr[i]].style.backgroundImage = `url(${img.src})`;
            };
            pictures[arr[i]].ariaLabel = 'wrong';
          }
        });

        game.getInfo().then((result) => {
          title.innerHTML = result[0];
          info.innerHTML = result[1];
          question.innerHTML = `Какую картину нарисовал ${result[2]}?`;
        });

        pictures.forEach((el) => {
          el.addEventListener('click', function (el) {
            if (el.target.parentElement.ariaLabel === 'right') {
              el.target.classList.add('indicator-right');
              icon.classList.add('icon-right');
              const sound = new Audio('./assets/sounds/right.mp3');
              sound.volume = userSettings.volume;
              sound.play();
            } else {
              el.target.classList.add('indicator-wrong');
              icon.classList.add('icon-wrong');
              const sound = new Audio('./assets/sounds/wrong.mp3');
              sound.volume = userSettings.volume;
              sound.play();
            }
            progressbarinner.style.animationPlayState = 'paused';
            clearInterval(intervalId);
            setTimeout(() => {
              popupOpen();
            }, 900);
          });
        });
      }
    }

    if (userSettings.gameType === 'artist') {
      userResults[userSettings.category] = [];
      userSettings.artistsResults[game.category] = 0;
      const picture = document.querySelector('.artist-picture');
      const buttons = document.querySelectorAll('.artist-button');

      nextBtn.addEventListener('click', function () {
        buttons.forEach((el) => {
          el.classList.remove('artist-right');
          el.classList.remove('artist-wrong');
          progressbarinner.classList.remove('inner');
          time.textContent = `0:${userSettings.answerTime
            .toString()
            .padStart(2, '0')}`;
        });
        if (icon.classList.contains('icon-right')) {
          userSettings.artistsResults[game.category] += 1;
          userResults[userSettings.category].push(true);
          game.updateScore();
        } else {
          userResults[userSettings.category].push(false);
        }
        if (game.current < game.length - 1) {
          popupClose();
          game.next();
          setTimeout(() => {
            showQuestion();
          }, 900);
        } else {
          const gameoverSound = new Audio('./assets/sounds/end.mp3');
          gameoverSound.volume = userSettings.volume;
          gameoverSound.play();
          popupContent.innerHTML = `<div class="gameover-picture"></div>
        <h3>Game over</h3>
        <p>${game.score}/10</p>
        <a href="/#/result">
        <button class="button gameover-button">Результат</button></a>`;
        }
      });
      showQuestion();
      function showQuestion() {
        icon.classList.remove('icon-right');
        icon.classList.remove('icon-wrong');
        progressbarinner.classList.add('inner');
        progressbarinner.style.animationPlayState = 'running';
        progressbarinner.addEventListener('animationend', function () {
          if (userSettings.isTimeGame) {
            const sound = new Audio('./assets/sounds/wrong.mp3');
            sound.volume = userSettings.volume;
            sound.play();
            icon.classList.add('icon-wrong');
            popupOpen();
          }
        });
        let counter = userSettings.answerTime - 1;
        const intervalId = setInterval(() => {
          time.textContent = `0:${counter.toString().padStart(2, '0')}`;
          counter -= 1;
          if (counter == -1) {
            clearInterval(intervalId);
          }
        }, 1000);
        const img = new Image();
        img.src = game.getPicture();
        img.onload = () => {
          picture.style.backgroundImage = `url(${img.src})`;
          popupPicture.style.backgroundImage = `url(${img.src})`;
        };
        game.getAnswers().then((result) => {
          let arr = [0, 1, 2, 3];
          arr.sort(() => Math.random() - 0.5);
          buttons[arr[0]].innerHTML = result[0];
          buttons[arr[0]].ariaLabel = 'right';
          for (let i = 1; i < 4; i++) {
            buttons[arr[i]].innerHTML = result[i];
            buttons[arr[i]].ariaLabel = 'wrong';
          }
        });

        game.getInfo().then((result) => {
          title.innerHTML = result[0];
          info.innerHTML = result[1];
        });
        buttons.forEach((el) => {
          el.addEventListener('click', function (el) {
            if (el.target.ariaLabel === 'right') {
              el.target.classList.add('artist-right');
              icon.classList.add('icon-right');
              const sound = new Audio('./assets/sounds/right.mp3');
              sound.volume = userSettings.volume;
              sound.play();
            } else {
              el.target.classList.add('artist-wrong');
              icon.classList.add('icon-wrong');
              const sound = new Audio('./assets/sounds/wrong.mp3');
              sound.volume = userSettings.volume;
              sound.play();
            }
            progressbarinner.style.animationPlayState = 'paused';
            clearInterval(intervalId);
            setTimeout(() => {
              popupOpen();
            }, 900);
          });
        });
      }
    }
  },
};

export default Quiz;
