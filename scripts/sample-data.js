require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("../models/Book");

const libros = [
  {
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    genero: ["Programación"],
    leido: false,
    resena: "Un clásico para mejorar tu código",
  },
  {
    titulo: "The Pragmatic Programmer",
    autor: "Andrew Hunt",
    genero: ["Desarrollo", "Mejores prácticas"],
    leido: true,
    resena: "Muy útil para devs de todos los niveles",
  },
  {
    titulo: "El nombre del viento",
    autor: "Patrick Rothfuss",
    genero: ["Fantasía"],
    leido: true,
    resena: "Historia atrapante con mucha narrativa",
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("🌱 Conectado a MongoDB. Insertando datos...");
    await Book.deleteMany(); // borra lo anterior para test limpio
    await Book.insertMany(libros);
    console.log("✅ Libros insertados correctamente");
    mongoose.disconnect();
  })
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));
