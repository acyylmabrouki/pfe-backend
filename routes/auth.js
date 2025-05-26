const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Validation pour l'enregistrement
const registerValidation = [
  check('email', 'Veuillez fournir un email valide').isEmail(),
  check('password', 'Le mot de passe doit contenir au moins 6 caractères').isLength({ min: 6 }),
  check('firstName', 'Le prénom est requis').notEmpty(),
  check('lastName', 'Le nom est requis').notEmpty()
];

// Routes d'authentification
router.post('/register', registerValidation, authController.register);
router.post('/login', authController.login);

// Route protégée pour la mise à jour des données utilisateur
router.put('/users/:id', protect, authController.updateUser);

module.exports = router; 