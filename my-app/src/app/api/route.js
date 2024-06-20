import mongoose from "mongoose";
import { connectionSrt } from "@/lib/db";
import { NextResponse } from "next/server";
import { Student } from "@/lib/model/student";
//import { Book } from "@/lib/model/book";
//import { Author } from "@/lib/model/author";
//import executeStoredProcedure from "./db/db";

export async function GET() {
    try {
        console.log("enter1");

        await mongoose.connect(connectionSrt);

        console.log(connectionSrt);

        const data = await Student.find();

        console.log("enter3");
		
        console.log(data);

        return NextResponse.json(data);

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return NextResponse.json({ error: "Error connecting to MongoDB" });
    }
}

export async function POST(request) {
    try {
        console.log(request);
        const data = await request.json(); 
        console.log("enter2");

        await mongoose.connect(connectionSrt);

        console.log("enter3");

        let student = new Student(data);

        console.log(student);

        const result = await student.save();

        console.log("Data inserted successfully:", result);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error posting data:", error);
        return NextResponse.json({ error: "Error posting data" });
    }
}

/*export async function GET() {
    try {
        console.log("1")
        await mongoose.connect(connectionSrt);
        console.log("2")
        const booksWithAuthor = await Book.aggregate([
            {
                $lookup:{
                    from:'authors',
                    localField:'author_id',
                    foreignField:'_id',
                    as:'data'
                }
            },
            {
                $unwind: '$data'
            }
        ])
        console.log("3")
        return NextResponse.json(booksWithAuthor);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}*/

/*export async function GET() {
    try {
        console.log("procedure accessed");
        await executeStoredProcedure();
        console.log("Stored procedure executed successfully.");
        return NextResponse.json({ message: "Stored procedure executed successfully." });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error executing stored procedure" }, { status: 500 });
    }
}*/