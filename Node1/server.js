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
            console.log("Подключение к серверу MySQL успешно установлено1");

            connection.query('SELECT * FROM Cars', (err, result, fields) => {
                response.json(result)
            })
        }
    })

})

app.post('/cars', jsonParser, (req, res) => {
    const car = req.body;
    if (!car) return response.sendStatus(400);

    connection.connect((err) => {
        if (err) {
            return console.error('err', err);
        } else {
            console.log("Подключение к серверу MySQL успешно установлено2");
            connection.query(`INSERT INTO Cars(brand, model, color, imgUrl, price, year) VALUES ('${car.brand}', '${car.model}', '${car.color}', '${car.imgUrl}', '${car.price}', '${car.year}')`, (err, result, fields) => {

                if (!err) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(400);
                }
            })
        }
    })
})

app.delete('/cars/:id', (req, res) => {
    console.log('-----req', req.params.id);

    connection.connect((err) => {
        if (err) {
            return console.error('err', err);
        } else {
            console.log("Подключение к серверу MySQL успешно установлено3");
            connection.query(`DELETE FROM Cars WHERE id='${req.params.id}'`, (err, result, fields) => {

                if (!err) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(400);
                }
            })
        }
    })
})

app.listen('3000', () => {
    console.log('server is run')
})