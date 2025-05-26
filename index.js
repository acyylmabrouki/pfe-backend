require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Afficher les variables d'environnement (pour le débogage)
console.log('Configuration:');
console.log('PORT from env:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Options de connexion MongoDB
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connexion à MongoDB avec plus de logs
console.log('Tentative de connexion à MongoDB...');
console.log('URL de connexion:', process.env.MONGODB_URI || 'mongodb://localhost:27017/central');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://host.docker.internal:27017/central',
  mongoOptions)
  .then(() => {
    console.log('✓ Connecté à MongoDB avec succès');
  })
  .catch(err => {
    console.error('✗ Erreur de connexion à MongoDB:', err.message);
    console.error('Stack trace:', err.stack);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API fonctionne correctement' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err.stack);
  res.status(500).json({ 
    message: 'Une erreur est survenue sur le serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Forcer l'utilisation du port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✓ Serveur démarré sur le port ${PORT}`);
  console.log(`  - URL de l'API: http://localhost:${PORT}/api`);
  console.log(`  - Route de test: http://localhost:${PORT}/api/test`);
}); 