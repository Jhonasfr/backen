const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// URL de conexión con tus credenciales
const uri = "mongodb+srv://carlos:MYVq68z5rrME2lWN@jhonasfr.8eafn.mongodb.net/?retryWrites=true&w=majority&appName=jhonasfr";

mongoose.connect(uri, {})
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch((err) => console.error("Error al conectar con MongoDB Atlas:", err));

const usuariosSchema = new mongoose.Schema({
    username: String,
    fechaNacimiento: Date,
    cedula: Number,
    correo: String,
    celular: Number,
    ciudad: String,
    password: String,
    role: String
}, { versionKey: false });

usuariosSchema.pre('save', async function(next) {
    console.log("bro??")
    if (!this.isModified('password')) return next(); 
    const saltRounds = 10; 
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash; 
    next();
  });

const Usuario = mongoose.model("users", usuariosSchema);


const codigoSchema = new mongoose.Schema({
    codigo: Number,
    premio: Number,
    activo: Boolean,
    fechaRegistro: Date,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'  
      }
}, { versionKey: false });

const Codigo = mongoose.model("codigos", codigoSchema);


module.exports = {
    Usuario, 
    Codigo};
