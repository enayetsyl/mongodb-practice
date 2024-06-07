import mongoose from "mongoose"


const problem1 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const result = await peopleCollection.find({ "address.city": "Marseille" }).toArray();

    res.status(200).json({ message: `Fetched ${result.length} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const problem2 = async (req, res) => {
  const userCollection = mongoose.connection.db.collection("user");
  try {
    const { email } = req.query
    const result = await userCollection.find(
      { email }, { projection: { email: 1, "favorites.movie": 1 } }).toArray();

    res.status(200).json({ message: `Fetched ${result.length} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const QueryControllers = {
  problem1, problem2
}