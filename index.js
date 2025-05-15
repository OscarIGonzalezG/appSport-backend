require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Cargar variables de entorno desde el archivo .env
// Configuración de la base de datos

const app = express();


// Middleware
app.use(cors({ origin: 'http://localhost:3000', // Cambia esto a la URL de tu frontend
    credentials: true,
}));
app.use(express.json());

// Rutas
app.use('/api', require('./routes/auth'));


// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(5000, () => console.log("Servidor corriendo en puerto 5000"));
    })
    .catch(err => console.error('Error de conexion', err));


// // este archivo es el punto de entrada de la aplicación backend
// // se importa express, mongoose y cors para poder crear el servidor y conectar a la base de datos
// // se importa dotenv para poder utilizar variables de entorno
// // se crea una instancia de express
// // se utiliza cors para permitir peticiones desde el frontend
// // se utiliza express.json() para poder parsear el cuerpo de las peticiones
// // se conecta a la base de datos MongoDB utilizando mongoose
// // se definen las rutas de la aplicación utilizando el router de express
// // se inicia el servidor en el puerto definido en las variables de entorno o en el puerto 5000 por defecto
// // se exporta la aplicación para poder utilizarla en otros archivos
// // se define la URL de la base de datos en las variables de entorno
// // se define la URL del frontend en las variables de entorno
// // se define el puerto del servidor en las variables de entorno
// // se define el puerto del servidor en el puerto 5000 por defecto
// // se define la URL del frontend en http://localhost:3000
// // se define el puerto del servidor en el puerto 5000 por defecto


