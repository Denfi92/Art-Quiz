const Utils = {
    parseRequestURL: () => {
        let url = location.hash.slice(0).toLowerCase() || '/';
        let r = url.split('Art-Quiz/');
        console.log(r);
        let request = {
            resource: null,
            id: null,
            verb: null,
        };
        request.resource = r[1];
        request.id = r[2];
        request.verb = r[3];
        return request;
    },

    sleep: (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    },
};

export default Utils;
