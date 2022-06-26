class Game {
  constructor(type, category) {
    this.type = type;
    this.category = category;
    this.length = 10;
    this.questionNum = 0;
    this.answers = [];
    this.right = '';
    this.score = 0;
    this.current = 0;
  }

  updateQuestionNum() {
    if (this.type === 'artist') {
      this.questionNum = this.category * 10;
    } else {
      this.questionNum = this.category * 10 + 120;
    }
  }

  getPicture() {
    return `../../image-data/img/${this.questionNum}.jpg`;
  }
  async getAnswers() {
    const imgData = '../../images.json';
    const res = await fetch(imgData);
    const data = await res.json();
    let authors = [data[this.questionNum].author];
    let pictures = [
      `../../image-data/img/${this.questionNum}.jpg`,
    ];
    do {
      const random = Math.floor(Math.random() * 241);
      if (!authors.includes(data[random].author)) {
        authors.push(data[random].author);
        pictures.push(
          `../../image-data/img/${random}.jpg`
        );
      }
    } while (authors.length < 4);
    if (this.type === 'artist') {
      return authors;
    } else return pictures;
  }
  async getInfo() {
    const imgData = '../../images.json';
    const res = await fetch(imgData);
    const data = await res.json();
    return [
      data[this.questionNum].name,
      `${data[this.questionNum].author}, ${data[this.questionNum].year}`,
      data[this.questionNum].author,
    ];
  }
  updateScore() {
    this.score = this.score + 1;
  }
  next() {
    this.current = this.current + 1;
    this.questionNum = this.questionNum + 1;
  }
}

export default Game;
