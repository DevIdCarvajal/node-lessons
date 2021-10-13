const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    googleId: { type: String }
  },
  {
    timestamps: true,
    // Borrar la contraseña y el googleId al convertir a JSON para que no lleguen a front
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password
        delete ret.googleId
      }
    }
  }
)

const User = model('User', userSchema)
module.exports = User
