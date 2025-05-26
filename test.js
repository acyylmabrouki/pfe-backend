const axios = require('axios');

const API_URL = 'http://localhost:3001/api';
let token = '';
let userId = '';

const testUser = {
  email: 'test@example.com',
  password: '123456',
  firstName: 'John',
  lastName: 'Doe',
  company: 'Test Company'
};

async function runTests() {
  try {
    // Test de la route de base
    console.log('Test de la connexion à l\'API...');
    const testResponse = await axios.get(`${API_URL}/test`);
    console.log('API accessible:', testResponse.data);

    // Test d'inscription
    console.log('\nTest d\'inscription...');
    console.log('Données d\'inscription:', testUser);
    const registerResponse = await axios.post(`${API_URL}/auth/register`, testUser);
    console.log('Inscription réussie:', registerResponse.data);
    token = registerResponse.data.token;
    userId = registerResponse.data.user.id;

    // Test de connexion
    console.log('\nTest de connexion...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('Connexion réussie:', loginResponse.data);

    // Test de mise à jour utilisateur
    console.log('\nTest de mise à jour utilisateur...');
    const updateData = {
      selectedPlan: 'premium',
      resources: {
        cpu: 4,
        ram: 8,
        storage: 100
      }
    };
    console.log('Données de mise à jour:', updateData);
    const updateResponse = await axios.put(
      `${API_URL}/auth/users/${userId}`,
      updateData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    console.log('Mise à jour réussie:', updateResponse.data);

  } catch (error) {
    console.error('Erreur lors des tests:');
    if (error.response) {
      console.error('Réponse d\'erreur:', error.response.data);
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('Pas de réponse reçue');
      console.error('Requête:', error.request);
    } else {
      console.error('Erreur:', error.message);
    }
  }
}

// Exécuter les tests
console.log('Démarrage des tests...');
console.log('URL de l\'API:', API_URL);
runTests(); 