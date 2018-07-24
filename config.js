module.exports = {
  // utilice estas por defecto si no se tienen configuradas
  port: process.env.PORT || 9000,
  db: process.env.MONGODB_URI || 'mongodb://localhost:27017/biblioteca',
  SECRET_TOKEN: 'bibliotoken'
}
