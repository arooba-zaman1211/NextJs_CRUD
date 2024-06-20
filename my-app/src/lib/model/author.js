import mongoose from "mongoose";

const authorModel = new mongoose.Schema({
	_id: String,
	name: String,
	birth_year: String
});

export const Author = mongoose.models.authors || mongoose.model("authors", authorModel);