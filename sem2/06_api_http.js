const http = require('http');

const servidor = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET' && req.url === '/alumnos') {
        res.statusCode = 200;

        const datos = [
            { nombre: "Juan" },
            { nombre: "Ana" }
        ];

        res.end(JSON.stringify(datos));

    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ mensaje: "No encontrado" }));
    }

});

servidor.listen(3000, () => {
    console.log('API corriendo en http://localhost:3000');
});