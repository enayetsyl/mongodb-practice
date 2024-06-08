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
const problem3 = async (req, res) => {
  const userCollection = mongoose.connection.db.collection("user");
  try {
    const { email } = req.query;
    
    const result = await userCollection.findOneAndDelete({ email: email });

    res.status(200).json( { message: "User deleted successfully", user: result.value });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const problem4 = async (req, res) => {
  const userCollection = mongoose.connection.db.collection("user");
  try {
    
    const result = await userCollection.find().sort({age: -1}).limit(1).toArray();

    res.status(200).json({ message: `Fetched ${result.length} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const problem5 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { firstName, lastName } = req.query
    console.log(firstName, lastName)
    // const result = await peopleCollection.countDocuments({firstName, lastName})
    const result = await peopleCollection.find({firstName, lastName}).count()

    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const problem6 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { firstName, lastName, dob } = req.query
    
    const result = await peopleCollection.find({firstName, lastName, birthDate: {$lt: new Date(dob)}}).count()
    // const result = await peopleCollection.countDocuments({firstName, lastName, birthDate: {$lt: new Date(dob)}})

    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const problem7 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { firstName, lastName,firstName1, lastName1 } = req.query
    console.log(firstName, lastName,firstName1, lastName1)
    const result = await peopleCollection.countDocuments({
        $or: [
            { firstName, lastName },
            { firstName1, lastName1 }
          ]
        });
          // const result = await peopleCollection.find({
          //   $or: [
          //     { firstName, lastName },
          //     { firstName1, lastName1 }
          //   ]
          // }).count();
   
    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const problem8 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { firstName, lastName, dob } = req.query
    
    const result = await peopleCollection.find({firstName, lastName, birthDate: {$lt: new Date(dob)}}).count()
   
    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const problem9 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { firstName, lastName, dob } = req.query
    
    const result = await peopleCollection.find({firstName, lastName, birthDate: {$lt: new Date(dob)}}).count()
   
    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const problem10 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { firstName, lastName, dob } = req.query
    
    const result = await peopleCollection.find({firstName, lastName, birthDate: {$lt: new Date(dob)}}).count()
   
    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const problem11 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { firstName, lastName, dob } = req.query
    
    const result = await peopleCollection.find({firstName, lastName, birthDate: {$lt: new Date(dob)}}).count()
   
    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const problem12 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { firstName, lastName, dob } = req.query
    
    const result = await peopleCollection.find({firstName, lastName, birthDate: {$lt: new Date(dob)}}).count()
   
    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const problem13 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { firstName, lastName, dob } = req.query
    
    const result = await peopleCollection.find({firstName, lastName, birthDate: {$lt: new Date(dob)}}).count()
   
    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const problem14 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { firstName, lastName, dob } = req.query
    
    const result = await peopleCollection.find({firstName, lastName, birthDate: {$lt: new Date(dob)}}).count()
   
    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const problem15 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { firstName, lastName, dob } = req.query
    
    const result = await peopleCollection.find({firstName, lastName, birthDate: {$lt: new Date(dob)}}).count()
   
    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const problem16 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { firstName, lastName, dob } = req.query
    
    const result = await peopleCollection.find({firstName, lastName, birthDate: {$lt: new Date(dob)}}).count()
   
    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const problem17 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { firstName, lastName, dob } = req.query
    
    const result = await peopleCollection.find({firstName, lastName, birthDate: {$lt: new Date(dob)}}).count()
   
    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const problem18 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { firstName, lastName, dob } = req.query
    
    const result = await peopleCollection.find({firstName, lastName, birthDate: {$lt: new Date(dob)}}).count()
   
    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const problem19 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { firstName, lastName, dob } = req.query
    
    const result = await peopleCollection.find({firstName, lastName, birthDate: {$lt: new Date(dob)}}).count()
   
    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const problem20 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { firstName, lastName, dob } = req.query
    
    const result = await peopleCollection.find({firstName, lastName, birthDate: {$lt: new Date(dob)}}).count()
   
    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const problem21 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { firstName, lastName, dob } = req.query
    
    const result = await peopleCollection.find({firstName, lastName, birthDate: {$lt: new Date(dob)}}).count()
   
    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const QueryControllers = {
  problem1, problem2, problem3, problem4, problem5, problem6, problem7, problem8, problem9, problem10, problem11, problem12, problem13, problem14, problem15, problem16, problem17, problem18, problem19, problem20, problem21
}