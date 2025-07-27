const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  genero: [String],
  leido: { type: Boolean, default: false },
  resena: String,
  fecha_agregado: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
