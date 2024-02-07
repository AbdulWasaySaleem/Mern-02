// bookRoute.js
import express from "express";
import { bookModel } from "../Model/Book.js";

const router = express.Router();

router.post("/book", async (req, res) => {
  try {
    const bookData = req.body;
    const newBook = new bookModel(bookData);
    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export { router as bookRoute }; // Named export 'bookRoute'
