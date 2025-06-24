# Tools - Configuration des Web Services

Ce projet contient plusieurs pages web qui utilisent des web services. La configuration des URLs de ces services est maintenant centralisée pour faciliter le déploiement et la maintenance.

## Configuration des Web Services

### Fichier de Configuration

Le fichier `js/config.js` contient la logique centralisée pour déterminer automatiquement l'URL de base des web services selon l'environnement :

- **Environnement local** (file://, localhost, 127.0.0.1) : `https://localhost:44355/`
- **Environnement de production** (GitHub Pages, Azure, etc.) : `https://chouch.azurewebsites.net/`

### Utilisation

Pour utiliser la configuration dans vos pages HTML :

1. **Inclure le fichier de configuration** :
   ```html
   <script src="js/config.js"></script>
   ```

2. **Utiliser les méthodes disponibles** :
   ```javascript
   // Pour un endpoint simple
   const url = wsConfig.buildUrl('api/calBirthday/full');
   
   // Pour l'API serveUrl
   const url = wsConfig.buildServeUrl('https://example.com/api');
   
   // Pour l'API serve
   const url = wsConfig.buildServeApiUrl('movie', '12345');
   ```

### Méthodes Disponibles

- `wsConfig.buildUrl(endpoint)` : Construit une URL complète pour un endpoint donné
- `wsConfig.buildServeUrl(targetUrl)` : Construit une URL pour l'API serveUrl
- `wsConfig.buildServeApiUrl(type, id)` : Construit une URL pour l'API serve

### Pages Modifiées

Les pages suivantes ont été mises à jour pour utiliser la configuration centralisée :

- `index.html` - Page principale avec timeline de visionnage
- `dashboard.html` - Tableau de bord TV
- `trakt-calendar.html` - Calendrier des films vus

## Déploiement

La configuration s'adapte automatiquement selon l'URL d'accès :

- **Développement local** : Utilise `localhost:44355`
- **Production** : Utilise `chouch.azurewebsites.net`

Aucune modification manuelle n'est nécessaire lors du déploiement.