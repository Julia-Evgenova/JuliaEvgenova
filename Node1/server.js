const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const createApplication = require('express/lib/express');

const app = express();
app.get(cors())

app.get('/cars', (request, response) => {

    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "CarsDB",
        password: ""
    });


    connection.connect((err) => {
        if (err) {
            return console.error('err', err);
        } else {
            console.log("Подключение к серверу MySQL успешно установлено");

            connection.query(`insert Cars(brand, model, color, imgUrl, price, year) VALUES ('${car.brand}', '${car.model}', '${car.color}', '${car.imgUrl}', '${car.price}', '${car.year}')`, (err, result, fields) => {
                console.log('---result', result);
                response.json(result)
            })

            connection.end();
        }
    })

})


app.post('/cars', (req, res) => {
    console.log('---req', req.body)
})


app.get('/car1', (request, response) => {
    response.send("<h2>Привет test222</h2>");
})

app.listen9('3000', () => {
    console.log('server is run')
})
