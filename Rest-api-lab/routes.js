const db = require('./db');

const router = app => {
    app.get('/', (request, response) => {
        const data = db.read();
        response.send(data);
    });

    app.get('/:id', (request, response) => {
        const data = db.read();
        const anime = data.find(u => u.id == request.params.id);
        response.send(anime);
    });

    app.delete('/:id', (request, response) => {
        let data = db.read();
        data = data.filter(u => u.id != request.params.id);
        db.write(data);
        response.send(data);
    });

    app.post('/', (request, response) => {
        const data = db.read();
        //const id = data.length;
        let id = 1;
        if(data.length > 0) id = data[data.length - 1].id + 1;
        const anime = {
            id: id,
            autor: request.body.autor,
            name: request.body.name
        };

        data.push(anime)
        db.write(data);

        response.send(anime);
    });

    app.put('/:id', (request, response) => {
        const data = db.read();
        const i = data.findIndex(u => u.id == request.params.id);
        data[i].autor = request.body.autor;
        data[i].name = request.body.name;

        db.write(data);
        response.send(data[i]);
    });
}

module.exports = router;
