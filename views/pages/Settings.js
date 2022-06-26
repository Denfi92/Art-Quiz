import userSettings from '../js/user_settings.js';
let Settings = {
  render: async () => {
    let view = `
      <header class="header header-settings">
        <p class="link" onClick="history.go(-1);">
          &#10094;&nbsp;&nbsp; Settings
        </p>
        <div class="close btn" onClick="history.go(-1);"></div>
      </header>
      <main class="main settings-main">
        <h2>Volume</h2>
        <div class="volume-container">
          <div class="sound btn"></div>
          <input
            type="range"
            value="${userSettings.volume}
            min="0"
            max="1"
            step="0.01"
            class="volume"
          />
        </div>
        <h2>Time game</h2>
        <div class="time-game-container">
          <p class="time-text">Off</p>
          <label class="switch">
            <input class="time-checkbox" type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
        <div class="time-to-answer">
          <h2>Time to answer</h2>
          <div class="time-settings">
            <button
              class="time-settings-button"
              type="button"
              onclick="this.nextElementSibling.stepDown()"
            >
              &minus;
            </button>
            <input
              type="number"
              min="5"
              max="30"
              step="5"
              value="${userSettings.answerTime}"
              readonly
              class="time-amount"
            />
            <button
              class="time-settings-button"
              type="button"
              onclick="this.previousElementSibling.stepUp()"
            >
              &plus;
            </button>
          </div>
        </div>
        <div class="settings-buttons">
          <button class="button default-button">Default</button>
        </div>
      </main>
        `;
    return view;
  },

  after_render: async () => {
    const volume = document.querySelector('.volume');
    const sound = document.querySelector('.sound');
    const defaultBtn = document.querySelector('.default-button');
    const timeAmount = document.querySelector('.time-amount');
    const swithTime = document.querySelector('.time-checkbox');
    const timeSetBtns = document.querySelectorAll('.time-settings-button');
    const timeToAnswer = document.querySelector('.time-to-answer');
    const timeText = document.querySelector('.time-text');
    defaultBtn.addEventListener('click', setDefaultSettings);
    sound.addEventListener('click', toggleSound);
    updateSettings();
    timeSetBtns.forEach((btn) => {
      btn.addEventListener('click', function () {
        userSettings.answerTime = timeAmount.value;
      });
    });

    swithTime.addEventListener('click', function () {
      userSettings.isTimeGame = swithTime.checked;
      updateSettings();
    });

    function setDefaultSettings() {
      userSettings.volume = 0.5;
      userSettings.isTimeGame = false;
      userSettings.answerTime = 15;
      updateSettings();
    }

    function updateSettings() {
      volume.style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${
        userSettings.volume * 100
      }%, #A4A4A4 ${userSettings.volume * 100}%, #A4A4A4 100%)`;
      timeAmount.value = userSettings.answerTime;
      volume.value = userSettings.volume;
      swithTime.checked = userSettings.isTimeGame;
      if (!userSettings.isTimeGame) {
        timeToAnswer.classList.add('inactive');
        timeText.innerHTML = 'Off';
      } else {
        timeToAnswer.classList.remove('inactive');
        timeText.innerHTML = 'On';
      }
      if (Number(userSettings.volume) === 0) {
        sound.classList.add('muted');
      } else {
        sound.classList.remove('muted');
      }
    }

    function toggleSound() {
      if (Number(userSettings.volume) === 0) {
        userSettings.volume = 0.5;
      } else userSettings.volume = 0;
      updateSettings();
    }

    volume.addEventListener('input', function () {
      userSettings.volume = this.value;
      updateSettings();
    });
  },
};

export default Settings;
