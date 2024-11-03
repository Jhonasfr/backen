const mongoose = require('mongoose');

// URL de conexión con tus credenciales
const uri = "mongodb+srv://steban1:oNPck0VZg4r0pgkM@cluster0.m0cif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch((err) => console.error("Error al conectar con MongoDB Atlas:", err));

const codigoSchema = new mongoose.Schema({
    codigo: String,
    premio: Number,
    activo: Boolean
});

const Codigo = mongoose.model("codigos", codigoSchema);

const usuariosSchema = new mongoose.Schema({
    username: String,
    fechaNacimiento: Date,
    cedula: String,
    correo: String,
    celular: Number,
    ciudad: String,
    password: String,
    role: String
});

const Usuario = mongoose.model("user", usuariosSchema);

module.exports = {
    Usuario, 
    Codigo};
