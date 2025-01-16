// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :Utilisez des TTL pour expirer les données obsolètes et éviter la surcharge de mémoire, ainsi que des clés structurées pour faciliter la gestion et la récupération des données.

// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :Utilisez des noms de clés descriptifs et structurés, comme "object:id:field", pour faciliter la gestion et la recherche. Évitez les clés longues et veillez à leur unicité pour prévenir les collisions.

const db = require("../config/db");
// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl = 3600) {
  try {
    const client = db.getRedisClient();
    if (!client) throw new Error("Redis client not initialized");
    const serializedData = JSON.stringify(data);
    if (ttl > 0) {
      await client.setEx(key, ttl, serializedData);
    } else {
      await client.set(key, serializedData);
    }
    return true;
  } catch (error) {
    console.error("Cache set error:", error);
    return false;
  }
}

async function getData(key) {
  try {
    const client = db.getRedisClient();
    if (!client) throw new Error("Redis client not initialized");
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Cache retrieval error:", error);
    return null;
  }
}

async function deleteData(key) {
  try {
    const client = db.getRedisClient();
    if (!client) throw new Error("Redis client not initialized");

    await client.del(key);
    return true;
  } catch (error) {
    console.error("Cache deletion error:", error);
    return false;
  }
}

async function clearCache() {
  try {
    const client = db.getRedisClient();
    if (!client) throw new Error("Redis client not initialized");
    await client.flushAll();
    return true;
  } catch (error) {
    console.error("Cache clear error:", error);
    return false;
  }
}

async function getTTL(key) {
  try {
    const client = db.getRedisClient();
    if (!client) throw new Error("Redis client not initialized");

    return await client.ttl(key);
  } catch (error) {
    console.error("Get TTL error:", error);
    return -2;
  }
}
  
  module.exports = {
    // TODO: Exporter les fonctions utilitaires
    cacheData,
    getData,
    deleteData,
    clearCache,
    getTTL,
  };