// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Un module séparé améliore la lisibilité et la réutilisabilité du code. Cela permet de gérer les connexions de manière centralisée,de simplifier la maintenance et de respecter les principes de séparation des responsabilités (SRP).

// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : Utiliser process.on pour détecter les signaux d'arrêt et appeler les méthodes de fermeture des clients (close(), quit()).

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries
  try {
    // Implémenter la connexion MongoDB
    mongoClient = new MongoClient(config.mongodb.uri);
    await mongoClient.connect();
    db = mongoClient.db(config.mongodb.dbName);
    console.log("Connected to MongoDB");

  } catch (error) {
    // Gérer les erreurs et les retries
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
  try {
    // Implémenter la connexion Redis
    redisClient = redis.createClient({ url: config.redis.uri });
    redisClient.on("error", (err) => console.error("Redis Client Error", err));
    await redisClient.connect();
    console.log("Connected to Redis");

  } catch (error) {
    // Gérer les erreurs et les retries
    console.error("Error connecting to Redis:", error);
    process.exit(1);
  }
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  getMongoClient: () => mongoClient,
  getRedisClient: () => redisClient,
  getDb: () => db,
};