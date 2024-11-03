const fs = require('fs/promises');
const path = require('path');
const collections = require('../models/collections.js')

// Función para verificar las credenciales

const login = async (req, res) => {
    const userFilePath = path.join(__dirname, '../../db/user.json');
    const adminFilePath = path.join(__dirname, '../../db/admin.json');
    const { username, password } = req.body;ñ
    try {
        const userData = await fs.readFile(userFilePath, 'utf-8');
        const adminData = await fs.readFile(adminFilePath, 'utf-8');
        const users = JSON.parse(userData).users;
        const admins = JSON.parse(adminData).admins;
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            return res.json({ role: 'user' });
        }
        const admin = admins.find(a => a.username === username && a.password === password);
        if (admin) {
            return res.json({ role: 'admin' });
        }
        return res.status(401).json({ error: 'Credenciales inválidas' });
    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

const getCodes = async (req, res) => {
    const {usuarioId} = req.query;
    const userExists = await collections.Usuario.findById(usuarioId).catch((err) => {
        console.error("Error:", err.message);
      });
    if (!userExists) {
        return res.status(400).json({ error: 'El usuario no existe' });
    }
    const codeExists = await collections.Codigo.find({ userId: userExists._id });
    res.json(codeExists);
};

const redeemCode = async (req, res) => {
    const { codigo, usuarioId } = req.body;
    try {
        const userExists = await collections.Usuario.findById(usuarioId).catch((err) => {
            console.error("Error:", err.message);
          });
        if (!userExists) {
            return res.status(400).json({ error: 'El usuario no existe' });
        }
        const codeExists = await collections.Codigo.find({ codigo: codigo });
        if (!codeExists.length) {
            return res.status(400).json({ error: 'El codigo no existe' });
        } else if (!codeExists[0].activo) {
            return res.status(400).json({ error: 'El codigo ya fue canjeado' });
        }
        const data = { userId: userExists._id, fechaRegistro: new Date().toISOString(), activo: false }
        const updateCode = await collections.Codigo.updateOne({ codigo: codigo }, data);
        return res.status(201).json({...codeExists[0]._doc,...data});
    } catch (error) {
        console.error('Error al agregar el nuevo usuario:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};


const addUser = async (req, res) => {
    const { username, fechaNacimiento, cedula, correo, celular, ciudad, password, role } = req.body;

    if (!['admin', 'user'].includes(role)) {
        return res.status(400).json({ error: '' });
    }
    try {
        const userExists = await collections.Usuario.find({ correo: correo });
        if (userExists.length) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        const newUser = { username, fechaNacimiento, cedula, correo, celular, ciudad, password, role };

        const nuevoUsuario = new collections.Usuario(newUser);
        const usuarioGuardado = await nuevoUsuario.save();
        return res.status(201).json({ message: `Nuevo usuario agregado.`, data: usuarioGuardado });
    } catch (error) {
        console.error('Error al agregar el nuevo usuario:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

const viewUser = async (filter = {}) => {
    try {
        const codigosFiltrados = await collections.Codigo.find({activo:false});
        const ganadoresFiltrados = await collections.Usuario.find({ _id: { $in: codigosFiltrados.map((codigo => codigo.userId.toString())) } })
            .then((usuarios)=> usuarios.map((usuario)=> {
                return {
                    usuario, 
                    codigos: codigosFiltrados.filter((codigo) => {return codigo.userId.toString() == usuario._id.toString()})
                }
            }));
        res.status(200).json(ganadoresFiltrados);
    } catch (error) {
        console.error("Error al filtrar ganadores:", error);
        throw new Error("Error al obtener la lista de ganadores");
    }
};



module.exports = {
    getCodes,
    redeemCode,
    login,
    addUser,
    viewUser
};
