fs = require('fs');

const read = () => {
    let data = [];
    try {
        const file = fs.readFileSync('./db.json', 'utf8');
        data = JSON.parse(file);
    } catch (err) {
        console.error(err)
    }
    return data;
}

const write = (data) => {
    fs.writeFileSync("./db.json", JSON.stringify(data));
}

exports.write = write;
exports.read = read;
