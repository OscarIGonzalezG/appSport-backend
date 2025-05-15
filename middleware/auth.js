const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //Esto tendrá { id: ...}
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido' });
    }
}

module.exports = verifyToken;




// // // Este archivo define un middleware para verificar el token JWT en las solicitudes
// // // de los usuarios. Si el token es válido, se permite el acceso a la ruta solicitada.
// // // Si no es válido, se devuelve un error 403 (Forbidden).
// // // El middleware verifica si el token está presente en la cabecera de autorización
// // // y lo decodifica utilizando la clave secreta definida en el archivo .env.
// // // Si el token es válido, se llama a la función next() para continuar con la
// // // ejecución de la ruta. Si no es válido, se devuelve un error 403 (Forbidden).
// // // El middleware también puede agregar información del usuario decodificada
// // // al objeto req para que esté disponible en las rutas posteriores.
// // // Esto permite que las rutas posteriores accedan a la información del usuario
// // // sin necesidad de volver a decodificar el token.
// // // En resumen, este middleware es una forma de proteger las rutas de la API
// // // asegurando que solo los usuarios autenticados puedan acceder a ellas.
// // // Además, se asegura de que el token sea válido y no haya sido manipulado.
// // // Esto es importante para mantener la seguridad de la aplicación y proteger
// // // la información sensible de los usuarios.
// // // El middleware se puede utilizar en cualquier ruta de la API que requiera
// // autenticación, simplemente importándolo y usándolo como un middleware
// // en la ruta deseada. Por ejemplo:
// // const verifteToken = require('../middleware/auth');
// // const express = require('express');
// const router = express.Router();
// const verifteToken = require('../middleware/auth');
// const User = require('../models/User');

