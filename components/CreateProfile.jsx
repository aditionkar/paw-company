"use client";
import React, { useState } from "react";

const CreateProfile = () => {
  const [petType, setPetType] = useState("dog");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    breed: "",
    height: "",
    allergies: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");


  const dogBreeds = ["Golden Retriever", "Bulldog", "Beagle", "Poodle", "Labrador"];
  const catBreeds = ["Persian Cat", "Siberian Cat", "Bengal Cat", "Maine Coon", "Ragdoll"];

  const breeds = petType === "dog" ? dogBreeds : catBreeds;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePetTypeChange = (type) => {
    setPetType(type);
    setFormData({ ...formData, breed: "" });
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName("");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
  
    // Prepare the data as a plain JSON object
    const dataToSend = {
      name: formData.name,
      age: formData.age,
      breed: formData.breed,
      height: formData.height,
      allergies: formData.allergies,
      type: petType,
      userId: "67874ff545365cea6414ee13", // Replace with the actual userId
    };
  
    try {
      const response = await fetch("/api/pets/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(dataToSend), // Send the data as a JSON string
      });
  
      if (response.ok) {
        setSuccessMessage("Pet information saved successfully!");
        setFormData({
          name: "",
          age: "",
          breed: "",
          height: "",
          allergies: "",
        });
        setSelectedFileName("");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Failed to save pet info"}`);
      }
    } catch (error) {
      console.error("Error saving pet info:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#B5C6FF] py-20 px-5">
      <h1 className="text-2xl md:text-4xl font-bold text-center text-370EA3 mb-10 text-[#370EA3] italic">
        Create Your Pet Profile now
      </h1>
      {successMessage && (
        <div className="bg-green-200 text-green-800 p-3 rounded-lg mb-4">
          {successMessage}
        </div>
      )}
      <div className="bg-white rounded-xl flex flex-col md:flex-row p-6 md:p-12 w-11/12 md:w-3/5 lg:w-[900px] relative shadow-[0px_0px_20px_10px_rgba(115,85,255,0.5)]">
        <div className="md:w-2/3 md:pr-6">
          <div className="flex items-center justify-between w-36 h-28 relative border-2 border-[#370EA3] rounded-xl mb-5">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-purple-500 font-bold pl-2"
              onClick={() => handlePetTypeChange("dog")}
            >
              ◀
            </button>

            <img
              src={petType === "dog" ? "/dog.svg" : "/cat.svg"}
              alt={petType}
              className="h-16 w-16 mx-auto"
            />

            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-purple-500 font-bold pr-2"
              onClick={() => handlePetTypeChange("cat")}
            >
              ▶
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center">
              <label className="block text-[#370EA3] font-bold w-1/3">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-2/3 h-[30px] border-b-2 border-b-[#7b25b5] p-2 text-[#370EA3] "
                required
              />
            </div>

            <div className="flex items-center">
              <label className="block text-[#370EA3] font-bold w-1/3">Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-2/3 h-[30px] border-b-2 border-b-[#7b25b5] p-2 text-[#370EA3] "
                required
              />
            </div>

            <div className="flex items-center">
              <label className="block text-[#370EA3] font-bold w-1/3">Breed:</label>
              <select
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
                className="w-2/3 h-[30px] border-2 border-[#7b25b5] rounded-lg px-2 focus:outline text-[#370EA3] bg-[#E1E9FF]"
                required
              >
                <option value="" disabled>
                  Select Breed
                </option>
                {breeds.map((breed, index) => (
                  <option key={index} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="block text-[#370EA3] font-bold w-1/3">Height(cm):</label>
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-2/3 h-[30px]  border-b-2 border-b-[#7b25b5] p-2 text-[#370EA3] "
                required
              />
            </div>

            <div className="flex items-center">
              <label className="block text-[#370EA3] font-bold w-1/3">Allergies:</label>
              <input
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                className="w-2/3 h-[30px] border-b-2 border-b-[#7b25b5] p-2 text-[#370EA3] "
              />
            </div>

            {/*<div className="flex items-center">
              <label className="block text-[#370EA3] font-bold w-1/3">Add Photo:</label>
              <div className="w-2/3">
                <input
                  type="file"
                  id="photoInput"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <label
                  htmlFor="photoInput"
                  className=" cursor-pointer text-center py-1 px-3 border-2 border-[#7b25b5] rounded-lg bg-[#E1E9FF] text-[#370EA3] font-medium"
                >
                  {selectedFileName || "Choose File"}
                </label>
              </div>
            </div>*/}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Info"}
            </button>
          </form>
        </div>

        <div className="hidden md:flex w-1/2 justify-center items-center">
          <img
            src="/petProfileDoctor.svg"
            alt="Pet Profile Doctor"
            className="max-w-full h-auto"
          />
        </div>
      </div>
      
    </div>
  );
};

export default CreateProfile;
