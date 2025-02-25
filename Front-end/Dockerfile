# Utiliser l'image Nginx Alpine (légère et rapide)
FROM nginx:alpine

# Copier les fichiers du frontend dans le répertoire de Nginx
COPY . /usr/share/nginx/html

# Exposer le port 80 pour servir l'application
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
