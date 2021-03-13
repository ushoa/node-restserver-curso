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
process.env.TIEMPO_TOKEN = "15000";
process.env.SEED = process.env.SEED || 'seed-produccion';
// ============================
//  Google Client ID
// ============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '459993929027-pd35n2ut0aejbm0q3nnir4ki6ol2np9c.apps.googleusercontent.com';
// ============================
//  DB
// ============================
if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URL;
}
process.env.URL_DB = urlDB;