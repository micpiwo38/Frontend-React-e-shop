const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3002;

// Configurer CORS pour permettre les requêtes depuis votre application React
app.use(cors({
    origin: 'http://localhost:3001' // Remplacez par l'URL de votre application React
}));

// Config de multer pour déplacer et stocker les fichiers uploadés
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, "public/img");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send("Erreur de chargement de fichier !");
    }
    res.status(200).json({
        filePath: `/img/${req.file.filename}`
    });
});

app.listen(PORT, () => {
    console.log("Le serveur de fichier est : " + `http://localhost:${PORT}`);
});