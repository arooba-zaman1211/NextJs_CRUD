import mongoose from "mongoose";
import { connectionSrt } from "@/lib/db";
import { NextResponse } from "next/server";
import { Student } from "@/lib/model/student";

export async function DELETE(request,{params}){
	try{
		await mongoose.connect(connectionSrt);
		const data = await Student.findByIdAndDelete(params.id)
		return NextResponse.json(data);
	}catch(error){
		console.error("Error deleting data:", error);
		return NextResponse.json({ error: "Error deleting data" });
	}
}

export async function GET(request,{params}){
	try{
		await mongoose.connect(connectionSrt);
		const data = await Student.findById(params.id);
		return NextResponse.json(data);
	}catch(error){
		console.error("Error getting data:", error);
		return NextResponse.json({ error: "Error getting data" });
	}
}

export async function PUT(request, { params }) {
	console.log("enter");
	try {
	  await mongoose.connect(connectionSrt);
	  const data = await request.json();
	  console.log("Data received:", data);
	  console.log("Params:", params); 
	  const id = params.id; 
	  console.log("ID:", id); 
	  const result = await Student.findByIdAndUpdate(id, data);
	  console.log("Data updated successfully:", result);
	  return NextResponse.json(result);
	} catch (error) {
	  console.error("Error updating data:", error);
	  return NextResponse.json({ error: "Error updating data" });
	}
  }
  