// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;
// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// ============================
//  Vencimiento token || SEED
// ============================
process.env.TIEMPO_TOKEN = "5h";
process.env.SEED = process.env.SEED || 'seed-produccion';
// ============================
//  DB
// ============================
if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URL;
}
process.env.URL_DB = urlDB;