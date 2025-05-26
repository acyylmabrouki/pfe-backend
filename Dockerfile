# Utiliser une image officielle de Node.js
FROM node:18

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Exposer le port que ton backend utilise
EXPOSE 3001

# Lancer le backend
CMD ["node", "index.js"]
