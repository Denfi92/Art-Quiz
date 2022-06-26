import userSettings from '../js/user_settings.js';
const Home = {
  render: async () => {
    const view = `
        <header class="header header-home">
            <a class="settings-link" href="/#/settings">
                <div class="settings btn" aria-label="settings"></div>
            </a>
        </header>
        <main class="main main-home">
            <object
                type="image/svg+xml"
                data="./assets/svg/art_quiz_logo.svg">
            </object>
            <div class="home-buttons">
                <a href="/#/categories">
                    <button class="button home-button artists-button">
                        Artists &nbsp;&nbsp;quiz
                    </button>
                </a>
                <a href="/#/categories">
                    <button class="button home-button pictures-button">
                        Pictures &nbsp;&nbsp;quiz
                    </button>
                </a>
            </div>
        </main>
        `;
    return view;
  },
  after_render: async () => {
    const artistsBtn = document.querySelector('.artists-button');
    const picturesBtn = document.querySelector('.pictures-button');
    artistsBtn.addEventListener('click', function () {
      userSettings.gameType = 'artist';
    });
    picturesBtn.addEventListener('click', function () {
      userSettings.gameType = 'picture';
    });
  },
};

export default Home;
