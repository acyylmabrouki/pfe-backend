const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email est requis'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Mot de passe est requis'],
    minlength: 6,
    select: false
  },
  firstName: {
    type: String,
    required: [true, 'Prénom est requis'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Nom est requis'],
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  selectedPlan: {
    type: String
  },
  resources: {
    cpu: Number,
    ram: Number,
    storage: Number
  },
  subscriptionStartDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'inactive'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Hash le mot de passe avant de sauvegarder
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 