import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference the `users` collection
    required: true,
  },
  type: {
    type: String,
    required: [true, "Please specify whether the pet is a dog or a cat"],
    enum: ["dog", "cat"],
  },
  name: {
    type: String,
    required: [true, "Please provide a name for the pet"],
  },
  age: {
    type: Number,
    required: [true, "Please provide the age of the pet"],
  },
  breed: {
    type: String,
    required: [true, "Please provide the breed of the pet"],
  },
  height: {
    type: Number,
    required: [true, "Please provide the height of the pet"],
  },
  allergies: {
    type: String,
    required: false, // This field is optional
  },
});

// Ensure the model is only created once
const Pet = mongoose.models.pets || mongoose.model("pets", petSchema);

export default Pet;
