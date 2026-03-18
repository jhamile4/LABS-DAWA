// Funciones de cálculo
const cuadrado = (lado) => lado * lado;
const triangulo = (base, altura) => (base * altura) / 2;
const circulo = (radio) => Math.PI * Math.pow(radio, 2);

// Exportar las funciones para que otros archivos las usen
module.exports = {
    cuadrado,
    triangulo,
    circulo
};