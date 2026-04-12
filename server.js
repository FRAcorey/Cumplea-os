const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Configuración de multer (guardar archivos)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Servir archivos estáticos
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Ruta para subir imágenes
app.post("/subir", upload.array("fotos"), (req, res) => {
    res.send("Imágenes subidas correctamente");
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});