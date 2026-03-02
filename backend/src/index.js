const express = require('express')
const cors = require('cors')
const pool = require('./config/db')
require('dotenv').config({ path: '../.env' })

const app = express()
app.use(cors())
app.use(express.json())

app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json({ mensaje: 'Conexión exitosa', fecha: result.rows[0] })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})