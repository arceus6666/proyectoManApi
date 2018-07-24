const config = require('./config')
const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect(config.db, (err, res) => {
  if (err) {
    return console.log(`[index] Hubo un error al inicializar: ${err}`)
  } else {
    console.log('[index] Conexion a DB establecida.')
    app.listen(config.port, () => {
      console.log(`[index] Api ejecutandose desde el puerto ${config.port}.`)
    })
  }
})
