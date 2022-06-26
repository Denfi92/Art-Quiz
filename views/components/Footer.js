let Footer = {
    render: async () => {
        let view = /*html*/ `
        <a href="https://rs.school/">
            <div class="rs-logo btn"></div>
        </a>
        <p>
            <a class="link" href="https://github.com/Denfi92">Daniil Fuzeev</a>
            <date>2022</date>
        </p>
        `;
        return view;
    },
    after_render: async () => {},
};

export default Footer;
