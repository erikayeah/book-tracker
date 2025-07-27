const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

router.get("/", async (_req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

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

router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Libro eliminado" });
  } catch (err) {
    res.status(404).json({ error: "Book not found" });
  }
});

module.exports = router;
