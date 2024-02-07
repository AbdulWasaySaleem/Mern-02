// Book.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  desc: { type: String, required: true },
  bookTitle: { type: String, required: true },
  bookPdfUrl: { type: String, required: true },
});

const bookModel = mongoose.model("books", bookSchema);

export { bookModel }; // Named export

// Alternatively, you can use the shorthand for named exports:
// export const bookModel = mongoose.model('books', bookSchema);
