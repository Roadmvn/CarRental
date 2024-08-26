# RentalCar/docker/backend.Dockerfile

FROM node:20

# Créer un utilisateur non-root
RUN useradd -m nodeuser

WORKDIR /usr/src/app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le reste des fichiers de l'application
COPY . .

# Copier le fichier .env s'il existe
COPY .env* ./

# Changer le propriétaire des fichiers
RUN chown -R nodeuser:nodeuser /usr/src/app

# Utiliser l'utilisateur non-root
USER nodeuser

EXPOSE 5000

CMD ["npm", "start"]