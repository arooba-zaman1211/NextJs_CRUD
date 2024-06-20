import mongoose from "mongoose";
import { connectionSrt } from "@/lib/db";
import { Book } from "@/lib/model/book";
import { Author } from "@/lib/model/author";

mongoose.connect(connectionSrt);

async function executeStoredProcedure() {
    try {
        
		console.log("1.3")
		
        await Author.insertMany([
            { _id: "500", name: "Umera Ahmad", birth_year: "1980" },
            { _id: "600", name: "James Clear", birth_year: "1990" }
        ]);
		console.log("1.4")
        await Book.insertMany([
            { _id:"80",title: "Alif", author_id: "500", genre: "Fiction" },
            { _id:"80",title: "Atomic Habit", author_id: "600", genre: "non-fiction" },
        ]);

		console.log("1.5")
        console.log("Static data inserted successfully.");
    } catch (error) {
        console.error("Error inserting static data:", error);
    } finally {
        mongoose.disconnect();
    }
}

export default executeStoredProcedure;
