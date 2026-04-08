const http = require('http');

const servidor = http.createServer((req, res) => {

   // console.log(req.method);
   // console.log(req.url);

    console.log(res);

    res.end('Respuesta del servidor');
});

servidor.listen(3000, () => {
    console.log('Servidor activo');
});