const pool = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = async (req, res) => {
  const { usuario, contrasena } = req.body
  console.log('Datos recibidos:', usuario, contrasena)
  try {
    const result = await pool.query(
      'SELECT u.*, r.nombre_rol FROM usuarios u JOIN roles r ON u.id_rol = r.id_rol WHERE u.nombre = $1 AND u.activo = true',
      [usuario]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' })
    }

    const user = result.rows[0]

    const passwordValido = await bcrypt.compare(contrasena, user.contrasena)

    if (!passwordValido) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' })
    }

    const token = jwt.sign(
      {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        rol: user.nombre_rol
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    )

    res.json({
      token,
      usuario: {
        id: user.id_usuario,
        nombre: user.nombre,
        rol: user.nombre_rol,
        dependencia: user.dependencia,
        cargo: user.cargo
      }
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { login }