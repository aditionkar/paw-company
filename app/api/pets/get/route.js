import dbConnect from "@/dbConfig/dbConfig";
import Pet from "@/models/petModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await dbConnect();

    try {
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ error: "User ID is required to fetch pets" });
      }

      // Find pets associated with the userId
      const pets = await Pet.find({ userId });

      if (!pets || pets.length === 0) {
        return res.status(404).json({ message: "No pets found for this user" });
      }

      return res.status(200).json({ pets });
    } catch (error) {
      console.error("Error fetching pet profiles:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
