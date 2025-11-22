require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// CONEXIÓN (Usando tus credenciales reales y BD 'asistenciaEscuela')
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB Atlas (Modo Fase 1 y 2)'))
    .catch(err => console.error('❌ Error de conexión:', err));

// --- ESQUEMA NUEVO (Doble Evidencia) ---
const alumnoSchema = new mongoose.Schema({
    no: Number,
    id: String,
    nombre: String,
    asistio: { type: Boolean, default: true },
    
    // Fase 1: Tabla
    checkTabla: { type: Boolean, default: false },
    archivoTablaNombre: String,
    archivoTablaBase64: String,

    // Fase 2: Resumen
    checkResumen: { type: Boolean, default: false },
    archivoResumenNombre: String,
    archivoResumenBase64: String,

    duda: { type: String, default: "" }
});

const Alumno = mongoose.model('Alumno', alumnoSchema);

// --- RUTAS ---

app.get('/api/init', async (req, res) => {
    const count = await Alumno.countDocuments();
    if (count === 0) {
        // Tu lista de siempre
        const listaCompleta = [
            { no: 1, id: "24301860", nombre: "AMAYRANY HERNANDEZ CRUZ" },
            { no: 2, id: "24300588", nombre: "ANDRICK ELIAS LEON CHAVEZ" },
            { no: 3, id: "24300720", nombre: "ANGEL DANIEL RODRIGUEZ GUZMAN" },
            { no: 4, id: "24300664", nombre: "ANTONIO BLADIMIR TOVAR PONCIANO" },
            { no: 5, id: "24300648", nombre: "ARIADNA OLVERA MARTINEZ" },
            { no: 6, id: "24300706", nombre: "AXEL TRISTAN SEGUNDO MAGAÑA" },
            { no: 7, id: "24300582", nombre: "CHRISTIAN ISAAC MARTINEZ HERNANDEZ" },
            { no: 8, id: "24300600", nombre: "DALIA JANETH MARTINEZ DELGADILLO" },
            { no: 9, id: "24300558", nombre: "DANTE ALEXANDER HERNANDEZ DELGADO" },
            { no: 10, id: "24300961", nombre: "ELAN ANTHONY MARTINEZ CASTILLO" },
            { no: 11, id: "24300564", nombre: "ERIKA JANETH BURGOS CRUZ" },
            { no: 12, id: "24300687", nombre: "ESMERALDA BAUTISTA MARTINEZ" },
            { no: 13, id: "24300606", nombre: "FERNANDO YAHIR GALICIA AVILA" },
            { no: 14, id: "20300144", nombre: "FRANCISCO HERNANDEZ HERNANDEZ" },
            { no: 15, id: "24300679", nombre: "HECTOR BADILLO GARCIA" },
            { no: 16, id: "24300712", nombre: "JAHURI NAHUM ALPIZAR SANCHEZ" },
            { no: 17, id: "24301030", nombre: "JAVIER MARTINEZ SANCHEZ" },
            { no: 18, id: "24300603", nombre: "JEAN CARLO MARTINEZ VIZUETH" },
            { no: 19, id: "24300732", nombre: "JESSICA ORTIZ MEXICANO" },
            { no: 20, id: "24300573", nombre: "JONATHAN ISAAC PRADO MARTINEZ" },
            { no: 21, id: "24300597", nombre: "JUAN MIGUEL REYES RESENDIZ" },
            { no: 22, id: "24300626", nombre: "KEVIN AXEL VARGAS MIGUEL" },
            { no: 23, id: "24301488", nombre: "LEONARDO DAVID CAYETANO GODINEZ" },
            { no: 24, id: "24300591", nombre: "LUIS ARMANDO ELIZALDE AVILA" },
            { no: 25, id: "24300568", nombre: "LUIS GARCIA CRUZ" },
            { no: 26, id: "24300589", nombre: "MANUEL ALEJANDRO JIMENEZ RODRIGUEZ" },
            { no: 27, id: "24300628", nombre: "MEGAN ARIANET HOWARD SN" },
            { no: 28, id: "24300683", nombre: "OSMAR AMAURY CONTRERAS HUERTA" },
            { no: 29, id: "24300655", nombre: "PEDRO DAZAEV JUAREZ OLGUIN" },
            { no: 30, id: "24300580", nombre: "RODOLFO ORTEGA SANTILLAN" },
            { no: 31, id: "24300590", nombre: "SAMUEL SALINAS LAGUNA" },
            { no: 32, id: "24300688", nombre: "SARAIH TERESA CORONA JUAREZ" }
        ];
        await Alumno.insertMany(listaCompleta);
        return res.json({ msg: 'BD Inicializada' });
    }
    res.json({ msg: 'Datos existentes' });
});

app.get('/api/alumnos', async (req, res) => {
    try {
        const alumnos = await Alumno.find().sort({ no: 1 });
        res.json(alumnos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/alumnos/:id', async (req, res) => {
    try {
        await Alumno.findByIdAndUpdate(req.params.id, req.body);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});