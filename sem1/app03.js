const areas = require('./areas');

console.log("--- CÁLCULO DE ÁREAS ---".green);
console.log(`Área del cuadrado (lado 5): ${areas.cuadrado(5)}`);
console.log(`Área del triángulo (base 10, altura 5): ${areas.triangulo(10, 5)}`);
console.log(`Área del círculo (radio 3): ${areas.circulo(3).toFixed(2)}`);