const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');



// Ruta de registro
router.post('/register', async (req, res) => {
        try {
        const { username, email, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});


// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' });

        const token = jwt.sign(
            { id: user._id, role:user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d'}
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

// ruta portegida
router.get("/profile", verifyToken, async  (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el perfil" });
    }
});


// Ruta protegida solo para admins
router.get("/admin-only", verifyToken, authorizeRoles('admin'), (req, res) => {
  res.status(200).json({ message: "Ruta solo para admins" });
});

module.exports = router;

// // este archivo define las rutas de autenticación para el registro de usuarios
// // y la generación de tokens JWT. Utiliza el modelo de usuario para interactuar
// // con la base de datos y bcrypt para encriptar las contraseñas.
// // La ruta de registro permite a los nuevos usuarios registrarse proporcionando
// // un nombre de usuario, correo electrónico y contraseña. Si el usuario ya
// // existe, se devuelve un error 400. Si el registro es exitoso, se devuelve
// // un mensaje de éxito. El middleware de autenticación verifica el token JWT
// // en las solicitudes de los usuarios. Si el token es válido, se permite el
// // acceso a la ruta solicitada. Si no es válido, se devuelve un error 403.
// // El middleware verifica si el token está presente en la cabecera de autorización
// // y lo decodifica utilizando la clave secreta definida en el archivo .env.
// // Si el token es válido, se llama a la función next() para continuar con la
// // ejecución de la ruta. Si no es válido, se devuelve un error 403 (Forbidden).
// // El middleware también puede agregar información del usuario decodificada
// // al objeto req para que esté disponible en las rutas posteriores.
// // Esto permite que las rutas posteriores accedan a la información del usuario
// // sin necesidad de volver a decodificar el token.
// // En resumen, este middleware es una forma de proteger las rutas de la API
// // asegurando que solo los usuarios autenticados puedan acceder a ellas.
// // Además, se asegura de que el token sea válido y no haya sido manipulado.
// // Esto es importante para mantener la seguridad de la aplicación y proteger
// // la información sensible de los usuarios.
// // El middleware se puede utilizar en cualquier ruta de la API que requiera
// // autenticación, simplemente importándolo y usándolo como un middleware
// // en la ruta deseada. Por ejemplo:
// // const verifteToken = require('../middleware/auth');
// // const express = require('express');
// // const router = express.Router();
// // const verifteToken = require('../middleware/auth');
// // const User = require('../models/User');
// // const jwt = require('jsonwebtoken');
//










