const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')

const app = express();
const jsonParser = express.json();
app.use(cors());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "CarsDB",
    password: ""
});


app.get('/cars', (request, response) => {
    connection.connect((err) => {
        if (err) {
            return console.error('err', err);
        } else {
            console.log("Подключение к серверу MySQL успешно установлено");

            connection.query('SELECT * FROM Cars', (err, result, fields) => {
                console.log('-----result', result);

                response.json(result)
            })

            connection.end();
        }
    })

})

app.post('/cars', jsonParser, (req, res) => {
    console.log('---req', req.body);

    const car = req.body;
    if (!car) return response.sendStatus(400);

    connection.connect((err) => {
        if (err) {
            return console.error('err', err);
        } else {
            console.log("Подключение к серверу MySQL успешно установлено");
            console.log('------111', `INSERT INTO Cars(brand, model, color, imgUrl, price, year) VALUES (${car.brand}, ${car.model}, ${car.color}, ${car.imgUrl}, ${car.price}, ${car.year})`);
            connection.query(`INSERT INTO Cars(brand, model, color, imgUrl, price, year) VALUES ('${car.brand}', '${car.model}', '${car.color}', '${car.imgUrl}', '${car.price}', '${car.year}')`, (err, result, fields) => {

                if (!err) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(400);
                }
            })
        }
    })
    // connection.end();
})

app.delete('/')

app.get('/car1', (request, response) => {
    response.send("<h2>Привет test222</h2>");
})

app.listen('3000', () => {
    console.log('server is run')
})