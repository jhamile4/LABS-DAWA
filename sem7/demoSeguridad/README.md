🔹Paso 1: Preparar el entorno
Objetivo: Tener listo el espacio de trabajo para programar.

Abre Visual Studio Code.

Crea una carpeta llamada demoSeguridad.

Abre esa carpeta en VS Code.

Inicializa el proyecto con:

bash
npm init -y
👉 Esto crea el archivo package.json que describe tu proyecto.

Aprendizaje: Estás creando un proyecto Node.js. El package.json es como la “ficha técnica” de tu aplicación.

🔹 Paso 2: Instalar dependencias
Ejecuta estos comandos en la terminal dentro de tu carpeta:

bash
npm install express jsonwebtoken bcryptjs dotenv cors
npm install nodemon --save-dev
npm install sequelize mysql2
👉 Cada paquete tiene un propósito:

express → framework para crear APIs.

jsonwebtoken → genera y valida JWT.

bcryptjs → encripta contraseñas.

dotenv → gestiona variables de entorno.

cors → permite que tu API sea consumida desde otros orígenes.

sequelize + mysql2 → ORM para conectarte a MySQL.

nodemon → reinicia el servidor automáticamente cuando cambias código.

Aprendizaje: Estás armando las piezas que tu API necesita para funcionar y ser segura.