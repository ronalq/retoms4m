const cors = require('cors');

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

app.use(cors());

app.get('/api/v1/Production/leerArchivo/productionact', (req, res) => {
    const filePath = path.join(__dirname, 'productionact.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el archivo');
            return;
        }
        res.send(data);
    });
});

app.get('/api/v1/Production/leerArchivo/productionprev', (req, res) => {
    const filePath = path.join(__dirname, 'productionprev.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el archivo');
            return;
        }
        res.send(data);
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
