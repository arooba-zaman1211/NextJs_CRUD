import mongoose from "mongoose";

const bookModel = new mongoose.Schema({
	_id: String,
	title:String,
	author_id:String,
	genre:String
});

export const Book = mongoose.models.books || mongoose.model("books", bookModel);