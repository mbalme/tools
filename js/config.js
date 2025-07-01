/**
 * Configuration centralisée pour les URLs des web services
 * Détermine automatiquement l'URL de base selon l'environnement
 */

class WebServiceConfig {
    constructor() {
        this.baseUrl = this.determineBaseUrl();
    }

    /**
     * Détermine l'URL de base selon l'environnement
     * @returns {string} L'URL de base appropriée
     */
    determineBaseUrl() {
        const currentUrl = window.location.href;
        
        // Si on est en local (file:// ou localhost)
        if (currentUrl.startsWith('file://') || 
            currentUrl.includes('localhost') || 
            currentUrl.includes('127.0.0.1')) {
            return 'https://localhost:44355/';
        }
        
        // Si on est sur GitHub Pages ou autre serveur de production
        if (currentUrl.includes('mbalme.github.io') || 
            currentUrl.includes('azurewebsites.net') ||
            currentUrl.startsWith('https://')) {
            return 'https://chouch.azurewebsites.net/';
        }
        
        // Par défaut, utiliser la production
        return 'https://chouch.azurewebsites.net/';
    }

    /**
     * Construit une URL complète pour un endpoint donné
     * @param {string} endpoint - L'endpoint de l'API (ex: 'api/calBirthday/full')
     * @returns {string} L'URL complète
     */
    buildUrl(endpoint) {
        // Supprimer le slash de début si présent pour éviter les doubles slashes
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
        return this.baseUrl + cleanEndpoint;
    }

    /**
     * Construit une URL pour l'API serveUrl
     * @param {string} targetUrl - L'URL cible à servir
     * @returns {string} L'URL complète pour serveUrl
     */
    buildServeUrl(targetUrl) {
        return this.buildUrl(`api/serveUrl?ws=${(targetUrl)}`);
    }

    /**
     * Construit une URL pour l'API serve
     * @param {string} type - Le type de contenu (ex: 'movie', 'tv')
     * @param {string} id - L'ID du contenu
     * @returns {string} L'URL complète pour serve
     */
    buildServeApiUrl(type, id) {
        return this.buildUrl(`api/serve/${type}/${id}`);
    }

    buildUrlString(endpoint) {
        return this.buildUrl(endpoint);
    }
}

// Créer une instance globale
const wsConfig = new WebServiceConfig();

// Exporter pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WebServiceConfig;
} 