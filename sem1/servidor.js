const http = require('http');
const areas = require('./areas');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Información del Estudiante</h1>');
    res.write('<p><strong>Nombre:</strong> Tu Nombre y Apellido</p>');
    res.write('<p><strong>Carrera:</strong> Diseño y Desarrollo de Software (DAWA)</p>');
    res.write('<p><strong>Año actual:</strong> 2026</p>');
    res.write('<h2>Áreas de Interés</h2>');
    res.write('<ul>');
    res.write(`<li>Cuadrado: ${areas.cuadrado(5)}</li>`);
    res.write(`<li>Triángulo: ${areas.triangulo(10, 5)}</li>`);
    res.write(`<li>Círculo: ${areas.circulo(3).toFixed(2)}</li>`);
    res.write('</ul>');
    res.end();
});

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});