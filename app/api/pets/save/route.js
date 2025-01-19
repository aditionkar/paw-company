import { connect } from "@/dbConfig/dbConfig";
import Pet from "@/models/petModel";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { userId, type, name, age, breed, height, allergies } = reqBody;

    console.log("Pet Data:", reqBody);

    if (!userId || !type || !name || !age || !breed || !height) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    const newPet = new Pet({
      userId,
      type,
      name,
      age,
      breed,
      height,
      allergies,
    });

    const savedPet = await newPet.save();

    console.log("Saved Pet:", savedPet);

    return NextResponse.json(
      {
        message: "Pet profile saved successfully",
        success: true,
        pet: savedPet,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving pet profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
