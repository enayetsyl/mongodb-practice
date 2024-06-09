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

    res.status(200).json({ message: "User deleted successfully", user: result.value });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const problem4 = async (req, res) => {
  const userCollection = mongoose.connection.db.collection("user");
  try {

    const result = await userCollection.find().sort({ age: -1 }).limit(1).toArray();

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
    const result = await peopleCollection.find({ firstName, lastName }).count()

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

    const result = await peopleCollection.find({ firstName, lastName, birthDate: { $lt: new Date(dob) } }).count()
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
    const { firstName, lastName, firstName1, lastName1 } = req.query
    console.log(firstName, lastName, firstName1, lastName1)
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

    const result = await peopleCollection.countDocuments({
      "wealth.credits": { $exists: true, $size: 0 }
    });
    // const result = await peopleCollection.find({
    //   "wealth.credits": { $exists: true, $size: 0 }
    // }).count();

    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const problem9 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { name, amount } = req.query
    const amountNumber = parseFloat(amount)

    const result = await peopleCollection.countDocuments({
      "payments": {
        $elemMatch: {
          "name": name,
          "amount": amountNumber
        }
      }
    });
    // const result = await peopleCollection.find({
    //   "payments": {
    //     $elemMatch: {
    //       "name": name,
    //       "amount":amountNumber
    //     }
    //   }
    // }).count();

    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const problem10 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { name, amount } = req.query
    const amountNumber = parseFloat(amount)
    const result = await peopleCollection.countDocuments({
      "payments.0.name": name,
      "payments.0.amount": amountNumber
    });
    // const result = await peopleCollection.find( {
    //     "payments.0.name": name,
    //     "payments.0.amount": amountNumber
    // }).count();

    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const problem11 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { name } = req.query

    const result = await peopleCollection.countDocuments({
      "payments.name": { $ne: name }
    });
    // const result = await peopleCollection.find({
    //   "payments.name": { $ne: name }
    // }).count();

    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const problem12 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    let { sex, name1, amount1, name2, amount2 } = req.query

    amount1 = parseFloat(amount1)
    amount2 = parseFloat(amount2)

    const result = await peopleCollection.countDocuments({
      $and: [
        { "sex": sex },
        {
          payments: {
            $elemMatch: {
              "name": name1, "amount": { $gt: amount1 },
            }
          }
        },
        {
          payments: {
            $elemMatch: {
              "name": name2, "amount": { $gt: amount2 },
            }
          }
        }

      ]
    });
    // const result = await peopleCollection.find({
    //   $and: [
    //     { "sex": sex },
    //     {
    //       payments: {
    //         $elemMatch: {
    //           "name": name1, "amount": { $gt: amount1 },
    //         }
    //       }
    //     },
    //     {
    //       payments: {
    //         $elemMatch: {
    //           "name": name2, "amount": { $gt: amount2 },
    //         }
    //       }
    //     }

    //   ]
    // }).count();

    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const problem13 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { city, country, include, exclude } = req.query

    const result = await peopleCollection.countDocuments(
      {
        $and: [
          { "address.city": city },
          { "address.country": country },
          { "payments": { $elemMatch: { "name": include } } },
          { "payments": { $not: { $elemMatch: { "name": exclude } } } },
        ]
      });
    //     const result = await peopleCollection.find(
    //       {$and: [
    // {"address.city" : city},
    // {"address.country" : country},
    // {"payments" : {$elemMatch: {"name": include}}},
    // {"payments" : {$not: {$elemMatch: {"name": exclude}}}},
    //       ]}
    //     ).count();

    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const problem14 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    let { male, female, city1, city2, flat, house, land, include, exclude } = req.query

    include = parseFloat(include)
    exclude = parseFloat(exclude)

    const result = await peopleCollection.countDocuments(
      {$and: [
        {$or: [ {$and: [{ "sex" : female}, {"address.city" : city1}]}, {$and: [{ "sex" : male}, {"address.city" : city2}]}] },
        {"wealth.realEstates" : {$elemMatch: {"type" : flat}}},
        {"wealth.realEstates" : {$elemMatch: {"type" : house}}},
        {"wealth.realEstates" : {$elemMatch: {"type" : land}}},
        {"wealth.realEstates" : {$elemMatch: {"worth" : {$gt: include}}}},
        {"wealth.realEstates" : {$not: {$elemMatch: {"worth" : {$lt: exclude}}}}},
       
      ]}
    )
    // const result = await peopleCollection.find(
    //   {$and: [
    //     {$or: [ {$and: [{ "sex" : female}, {"address.city" : city1}]}, {$and: [{ "sex" : male}, {"address.city" : city2}]}] },
    //     {"wealth.realEstates" : {$elemMatch: {"type" : flat}}},
    //     {"wealth.realEstates" : {$elemMatch: {"type" : house}}},
    //     {"wealth.realEstates" : {$elemMatch: {"type" : land}}},
    //     {"wealth.realEstates" : {$elemMatch: {"worth" : {$gt: include}}}},
    //     {"wealth.realEstates" : {$not: {$elemMatch: {"worth" : {$lt: exclude}}}}},
       
    //   ]}
    // ).count()
    

    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const problem15 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    let { size } = req.query
    size = parseFloat(size)

    const result = await peopleCollection.countDocuments({payments : {$size: size}})

    // const result = await peopleCollection.find({payments : {$size: size}}).count()

    res.status(200).json({ message: `Fetched ${result} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const problem16 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { firstName } = req.query

    const result = await peopleCollection.find({ firstName}).project({firstName:1, _id:1, lastName:1}).toArray()

    res.status(200).json({ message: `Fetched ${result.length} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const problem17 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    let { amount } = req.query
    amount = parseFloat(amount)
    // const result = await peopleCollection.find({ "payments" : { $elemMatch: {"amount": {$lt: amount}}} }).project({_id:1, firstName: 1, lastName: 1, "payments.$": 1}).toArray()
    const result = await peopleCollection.find({ "payments" : { $elemMatch: {"amount": {$lt: amount}}} },{_id: 1, firstName: 1, lastName: 1, "payments.$": 1}).toArray()

    res.status(200).json({ message: `Fetched ${result.length} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const problem18 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    let { country, category, name, amount } = req.query

    amount = parseFloat(amount)

    // const result = await peopleCollection.updateOne({"address.country" : country},
    //   {$addToSet:{"payments" : { "category" : category, "name": name, "amount": amount}}}
    // )
    const result = await peopleCollection.updateMany({"address.country" : country},
      {$addToSet:{"payments" : { "category" : category, "name": name, "amount": amount}}}
    )

    res.status(200).json({ message: `Modified ${result.modifiedCount} documents`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const problem19 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const result = await peopleCollection.updateMany({},{$unset: {"wealth.market" : ""}})

    res.status(200).json({ message: `Deleted ${result.modifiedCount} documents market value`, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};




export const QueryControllers = {
  problem1, problem2, problem3, problem4, problem5, problem6, problem7, problem8, problem9, problem10, problem11, problem12, problem13, problem14, problem15, problem16, problem17, problem18, problem19
}