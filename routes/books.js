const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// 📚 GET /api/books - Obtener todos los libros
router.get("/", async (_req, res) => {
  const books = await Book.find();
  res.json(books);
});

// ➕ POST /api/books - Crear un nuevo libro
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ PATCH /api/books/:id/leido - Marcar como leído
router.patch("/:id/leido", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { leido: true },
      { new: true }
    );
    res.json(book);
  } catch (err) {
    res.status(404).json({ error: "Book not found" });
  }
});

// ❌ DELETE /api/books/:id - Eliminar un libro
router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Libro eliminado" });
  } catch (err) {
    res.status(404).json({ error: "Book not found" });
  }
});

module.exports = router;
