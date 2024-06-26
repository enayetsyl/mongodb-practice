# Practicing MongoDB Queries with 200,000 Records: A Real-Life Scenario Simulation

## The objective of this blog 

- The aim of this blog is to practicing MongoDB query using 22 problems. We will use 200,000 records for this exercise. This large amount of data will help us simulate a real life scenario.

Download the data in json format from the following link. 
people: https://drive.google.com/file/d/1KElJF_gIVF54lY5l1TC1WOj6TVkTQIs9/view?usp=drive_link

order: https://drive.google.com/file/d/1JMRClMy8vBS_AH4X7Pd1ZW5dysfYIT89/view?usp=sharing

customer: https://drive.google.com/file/d/1O_VXeiRqwY5BZi2lcG8sxWaaejSfl4t6/view?usp=sharing

user: https://drive.google.com/file/d/1fRQqjKioxDvBu0k2YCjcdOMXOEahrRoI/view?usp=sharing

Import these data into your MongoDB Compass. Save them in four collection with the name of people, order, customer and user.  If you don't know how to do that, you can check out my following blog.

https://medium.com/@enayetflweb/how-to-import-data-into-mongodb-compass-a-step-by-step-guide-2c59edd89c14

### Setting up an express app

- We will start by setting an express app so that we don't have to run query in MongoDB Compass. 

- Run following commands to setup an express project.

```javascript
npm init -y
npm i express mongoose nodemon dotenv morgan
```

- Open the package.json file and following code inside it. Start script is for running the server.js file using nodemon and type set to module so we can use import syntax instead of require. 

```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon src/server.js"
  },
  "type": "module",
```

- Click on new file icon in vs Code and type "src/app/config/index.js" and hit enter. Inside the src folder create app.js and server.js file. In the root create .env and .gitignore file. Paste the following code in the files. Inside app folder create modules folder and inside that create query folder and inside that create two file named queryControllers.js and queryRoutes.js.

```javascript
// File name index.js

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};

// .env file
DATABASE_URL= Insert your MongoDB connection string here.
PORT=5000

// app.js file

import express from 'express'
import morgan from 'morgan';
import { QueryRoutes } from './app/modules/query/queryRoutes.js'

const app = express()

// Morgan setup for logging HTTP requests
app.use(morgan('dev'));
app.use(express.json())

// Routes
app.use("/api/query", QueryRoutes)

app.get("/", (req, res) => {
  res.send("Welcome to MongoDB practice.")
})



export default app;

// server.js file

import mongoose from "mongoose";
import config from "./app/config/index.js";
import app from "./app.js";

async function main() {
  try {
    await mongoose.connect(config.database_url)

    app.listen(config.port, () => {
      console.log(`MongoDB practicing app is listening on port ${config.port}`)
    })

  } catch (error) {
    console.log(error)
  }
}

main()

// .gitignore file

.env 
node_modules

// queryRoutes.js file

import express from 'express'
import { QueryControllers } from './queryControllers.js';

const router = express.Router()

router.get("/problem1", QueryControllers.problem1)

export const QueryRoutes = router;

// queryController.js file

const problem1 = async (req, res) => {

}


export const QueryControllers = {
  problem1, 
}

```

- I will provide a brief explanation about above code.

- In the index.js file i configure the environment and variables and export them. So that a single file will be responsible for exporting all the environmental variables.

- In the app.js file the main thing is the query routes. All query routes will be prefixed by "/api/query". I wrote the individual route in the queryRouter.js file. I used morgan package here so that in your console after each database operation you can see how much time is taken. 

- In the server.js file i create the MongoDB connection and it is the starting point of your application. 

- In the queryRoutes.js file i created a route for problem1. The logic will be written in the queryControllers file. I will create a new route for each of the problem in this file.

- In the queryControllers.js file i created a function called problem1 and exported it. I will use this function to solve the problem one. I will create a new function for each of the problem in this file.

### MongoDB Query - Problem 1

- Requirement: Find all users who are located in Marseille. Query the "people" collection.

```javascript
{
  _id: ObjectId("64ed4ed7345377d730c0ac99"),
  name: 'John Doe',
  email: 'johndoe@example.com',
  age: 28,
  address: {
    street: '123 Main St',
    city: 'Marseille',
    state: 'NY',
    zipcode: '10001'
  },
  favorites: {
    color: 'blue',
    food: 'pizza',
    movie: 'The Shawshank Redemption'
  },
  friends: [
    {
      name: 'Jane Smith',
      email: 'janesmith@example.com'
    },
    {
      name: 'Mike Johnson',
      email: 'mikejohnson@example.com'
    }
  ]
}
```

- If we look at the data, we can see that "Marseille" is the name of a city, and it is inside the "address" object. In the search query we should use "address.city: Marseille" to get the result.

- The solution is as follows:

```javascript
const problem1 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const result = await peopleCollection.find({ "address.city": "Marseille" }).toArray();
  
    res.status(200).json({message: `Fetched ${result.length} documents`, result});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
```

- In the response, we will get the document count as well as data. 

- Using postman or a browser if you hit "http://localhost:5000/api/query/problem1" route you will get 27693 documents. "GET /api/query/problem1 200 18907.387 ms - 26272327" This is the response from morgan in my console. This query took 19 seconds to return the data. 

- Learning: How to query a nested field.

### MongoDB Query - Problem 2

- Requirement: Find the user(s) with the email "johndoe@example.com" and retrieve their favorite movie. Query this in the user collection.

- Here we get the email as a query from the user and search the email field in the database. We also have to use projection properties to return only the email and favorites movie fields. By limiting the fields, we can save bandwidth and load the webpage faster in the browser. 

- The solution is as follows

```javascript
// In queryRoutes.js file add following

router.get("/problem2", QueryControllers.problem2)


// In queryControllers.js file add following

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
```

- Using postman or a browser if you hit "http://localhost:5000/api/query/problem2?email=johndoe@example.com"route you will get 3 documents. "GET /api/query/problem2?email=johndoe@example.com 200 296.225 ms - 386" This is the response from morgan in my console. This query took 386 milliseconds to return the data. 

- Learning: How to query using a field value. How to get a query parameter from the frontend. How to use projection to send necessary data to the frontend. 


### MongoDB Query - Problem 3

- Requirement: Delete the user with the email "alicewilliams@example.com" from the user collection.

- Here we get the email as a query from the user to search based on the email field and delete the document. 

- The solution is as follows

```javascript
// In queryRoutes.js file add following

router.delete("/problem3", QueryControllers.problem3)


// In queryControllers.js file add following

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


export const QueryControllers = {
  problem1, problem2,, problem3
}
```

- Using postman if you hit "http://localhost:5000/api/query/problem3?email=alicesmith@example.com"route you can delete the document. "DELETE /api/query/problem3?email=alicesmith@example.com 200 362.624 ms - 374" This is the response from morgan in my console. This query took 374 milliseconds to delete the data. 

- Learning: How to delete using a field value. How to get a query parameter from the frontend. 

### MongoDB Query - Problem 4

- Requirement: Find the user(s) with the highest age.

- We need to use the sort method to get the document with the highest age value. The value of the age field inside the sort method should be -1 to get the highest value. Setting it to +1 will give the lowest value.

- The solution is as follows

```javascript
// In queryRoutes.js file add following

router.get("/problem4", QueryControllers.problem4)



// In queryControllers.js file add following

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


export const QueryControllers = {
  problem1, problem2, problem3, problem4
}
```

- Using postman if you hit "http://localhost:5000/api/query/problem4" route you can get the document. "GET /api/query/problem4 200 332.470 ms - 425" This is the response from morgan in my console. This query took 425 milliseconds to delete the data. 

Learning: How to sort. How to get a document that has the highest or lowest value in a field.  

### MongoDB Query - Problem 5

- Requirement: Count all the people with first name "Pauline" and last name "Fournier" in the people collection.

- It can be done in two ways. Using "countDocuments" method or using the "find" method together with the "count" method.

- The solution is as follows

```javascript
// In queryRoutes.js file add following

router.get("/problem5", QueryControllers.problem5)



// In queryControllers.js file add following

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


export const QueryControllers = {
  problem1, problem2, problem3, problem5
}
```

- Using postman if you hit "http://localhost:5000/api/query/problem5?firstName=Pauline&lastName=Fournier" route you can get 67 as a result. "GET /api/query/problem5?firstName=Pauline&lastName=Fournier 200 744.065 ms - 46" This is the response from morgan in my console. This query took 744 milliseconds to get the count. 

Learning: How to use the "countDocuments" and "count" methods to get the count of documents that match the value of specific properties.  

### MongoDB Query - Problem 6

- Requirement: Count all the people with first name "Pauline" and last name "Fournier" in the people collection and who were born before January 1, 1970..


- It can be done in two ways: using the "countDocuments" method or using the "find" method together with the "count" method. For dates, you need to think in terms of comparison operators. If you want to find documents with dates in the past, you use $lt (less than), and if you want to find documents with dates in the future, you use $gt (greater than). We will use $lt as we want to count documents before January 1, 1970.

- The solution is as follows

```javascript
// In queryRoutes.js file add following

router.get("/problem6", QueryControllers.problem6)



// In queryControllers.js file add following

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

export const QueryControllers = {
  problem1, problem2, problem3, problem6
}
```

- Using postman if you hit "http://localhost:5000/api/query/problem6?firstName=Pauline&lastName=Fournier&dob=1970-01-01" route you can get 9 as a result. In the query if you use $gt then you will get 58 as a count result. "GET /api/query/problem6?firstName=Pauline&lastName=Fournier&dob=1970-01-01 200 724.974 ms - 44" This is the response from morgan in my console. This query took 744 milliseconds to get the count. 

Learning: How to use the "countDocuments" and "count" methods to get the count of documents that match the value of specific properties. How to use $lt and $gt.   

### MongoDB Query - Problem 7

- Requirement: Count all people with:
first name = Lucas last name= Dubois
first name = Camille last name= Dubois


- It can be done in two ways: using the "countDocuments" method or using the "find" method together with the "count" method. We also need to use "$or" operator, which will ensure that documents matching either one of the names are returned.

- The solution is as follows

```javascript
// In queryRoutes.js file add following

router.get("/problem7", QueryControllers.problem7)

// In queryControllers.js file add following

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

export const QueryControllers = {
  problem1, problem2, problem3, problem7
}
```

- Using postman if you hit "http://localhost:5000/api/query/problem7?firstName=Lucas&lastName=Dubois&firstName1=Camille&lastName1=Dubois" route you can get 103 as a result.  "GET /api/query/problem7?firstName=Lucas&lastName=Dubois&firstName1=Camille&lastName1=Dubois 200 786.518 ms - 48" This is the response from morgan in my console. This query took 786 milliseconds to get the count. 

Learning: How to use the "countDocuments" and "count" methods to get the count of documents that match the multiple value of specific properties. Use of "$or" operator.

### MongoDB Query - Problem 8

- Requirement: Count all the people who have "no credits". You can find credits in the field "wealth.credits.", this field is an array, because people can have one or more credits, if the array is empty then there are no credits.


- It can be done in two ways: using the "countDocuments" method or using the "find" method together with the "count" method. We will use "$exists" operator to checks if the wealth.credits field exists and "$size" operator to check its size is 0 (i.e., the array is empty).

- The solution is as follows

```javascript
// In queryRoutes.js file add following

router.get("/problem8", QueryControllers.problem8)

// In queryControllers.js file add following

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

export const QueryControllers = {
  problem1, problem2, problem3, problem8
}
```

- Using postman if you hit "http://localhost:5000/api/query/problem8" route you will get 83089 as a result. "GET /api/query/problem8 200 567.158 ms - 52" This is the response from morgan in my console. This query took 567 milliseconds to get the count. 

Learning: How to use the "countDocuments" and "count" methods to get the count of documents that match the value of specific properties. How to use $exists and $size operator.  

### MongoDB Query - Problem 9

- Requirement: Count everyone who spent exactly $12.99 on the cinema.


- It can be done in two ways: using the "countDocuments" method or using the "find" method together with the "count" method. We will use "$elemMatch" operator to check whether in the payment array any object has "name" property with the value of "cinema" and amount property with the value of "12.99". As req.query provides us a string so we have to convert the amount to a float value.

- The solution is as follows

```javascript
// In queryRoutes.js file add following

router.get("/problem9", QueryControllers.problem9)



// In queryControllers.js file add following

const problem9 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { name, amount } = req.query
    const amountNumber = parseFloat(amount)

    const result = await peopleCollection.countDocuments({
      "payments": {
        $elemMatch: {
          "name": name,
          "amount":amountNumber
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
```

- Using postman if you hit "http://localhost:5000/api/query/problem9?name=cinema&amount=12.99" route you will get 270 as a result. "GET /api/query/problem9?name=cinema&amount=12.99 200 1374.581 ms - 48" This is the response from morgan in my console. This query took 1374 milliseconds to get the count. 

Learning: How to use the "countDocuments" and "count" methods to get the count of documents that match the value of specific properties in an array. How to use $elemMatch operator.   

### MongoDB Query - Problem 10

- Requirement: Count all the people whose first payment was $12.99 for the cinema. In this lesson, you only count cases where payments[0] satisfy the above requirement.

- It can be done in two ways: using the "countDocuments" method or using the "find" method together with the "count" method. 

- The solution is as follows

```javascript
// In queryRoutes.js file add following

router.get("/problem10", QueryControllers.problem10)

// In queryControllers.js file add following

const problem10 = async (req, res) => {
  const peopleCollection = mongoose.connection.db.collection("people");
  try {
    const { name, amount } = req.query
    const amountNumber = parseFloat(amount)
    const result = await peopleCollection.countDocuments( {
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

export const QueryControllers = {
  problem1, problem2, problem3, problem10
}
```

- Using postman if you hit "http://localhost:5000/api/query/problem10?name=cinema&amount=12.99" route you will get 24 as a result.  "GET /api/query/problem10?name=cinema&amount=12.99 200 1269.457 ms - 46" This is the response from morgan in my console. This query took 1269 milliseconds to get the count. 

Learning: How to use the "countDocuments" and "count" methods to get the count of documents that match specific properties in the first index of an array.

### MongoDB Query - Problem 11

- Requirement: Count all the people who have never been to the "cinema" (no cinema payments yet).


- It can be done in two ways: using the "countDocuments" method or using the "find" method together with the "count" method. We have to use "$ne" operator to perform the query.

- The solution is as follows

```javascript
// In queryRoutes.js file add following

router.get("/problem11", QueryControllers.problem11)

// In queryControllers.js file add following

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

export const QueryControllers = {
  problem1, problem2, problem3, problem11
}
```

- Using postman if you hit "http://localhost:5000/api/query/problem11?name=cinema" route you can get 9 as a result. "GET /api/query/problem11?name=cinema 200 3253.759 ms - 52" This is the response from morgan in my console. This query took 3 seconds to get the count. 

Learning: How to use the "countDocuments" and "count" methods to get the count of documents that does not match the value of specific properties. How to use $ne.   

### MongoDB Query - Problem 12

- Requirement: Count all the "female" who spent more than "$100" on "shoes" and more than "$50" on "pants" in one bill.


- It can be done in two ways: using the "countDocuments" method or using the "find" method together with the "count" method. We will use "$and" operator so that documents match with all three conditions will be returned.  

- The solution is as follows

```javascript
// In queryRoutes.js file add following

router.get("/problem12", QueryControllers.problem12)



// In queryControllers.js file add following

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

export const QueryControllers = {
  problem1, problem2, problem3, problem6
}
```

- Using postman if you hit "http://localhost:5000/api/query/problem12?sex=female&name1=shoes&amount1=100&name2=pants&amount2=50" route you will get 913 as a result. "GET /api/query/problem12?sex=female&name1=shoes&amount1=100&name2=pants&amount2=50 200 1068.037 ms - 48" this is the response from morgan in my console. This query took 1 seconds to get the count. 

Learning: How to use the "countDocuments" and "count" methods to get the count of documents that match the value of specific properties. How to use $and operator to get documents that match more than one conditions.  

### MongoDB Query - Problem 13

- Requirement: Count all the people from "Warsaw", "Poland" who have been to the "cinema" but never to the "disco".


- It can be done in two ways: using the "countDocuments" method or using the "find" method together with the "count" method. We have to match "$an"d operator to match all conditions also "$elemMatch" to match exact value and $not to exclude a certain value.

- The solution is as follows

```javascript
// In queryRoutes.js file add following

router.get("/problem13", QueryControllers.problem13)



// In queryControllers.js file add following

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
export const QueryControllers = {
  problem1, problem2, problem3, problem6
}
```

- Using postman if you hit "http://localhost:5000/api/query/problem13?city=Warsaw&country=Poland&include=cinema&exclude=disco" route you will get 13352 as a result. "GET /api/query/problem13?city=Warsaw&country=Poland&include=cinema&exclude=disco 200 690.053 ms - 52" This is the response from morgan in my console. This query took 690 milliseconds to get the count. 

Learning: How to use the "countDocuments" and "count" methods to get the count of documents that match the value of specific properties. How to use $and, $elemMatch and $not operator.   

### MongoDB Query - Problem 14

- Requirement: Count all the "female" from "Paris" and "male" from "Cracow" that have all of the following properties: flat, house, land.
At least one of the properties must be valued at more than "$2,000,000", and none of the properties under "$500,000".


- It can be done in two ways: using the "countDocuments" method or using the "find" method together with the "count" method. For this query we need to implement several nested query.

- The solution is as follows

```javascript
// In queryRoutes.js file add following

router.get("/problem14", QueryControllers.problem14)



// In queryControllers.js file add following

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

export const QueryControllers = {
  problem1, problem2, problem3, problem6
}
```

- Using postman if you hit "http://localhost:5000/api/query/problem14?female=female&male=male&city1=Paris&city2=Cracow&flat=flat&house=house&land=land&include=2000000&exclude=500000" route you will get 23 as a result. In the query if you use $gt then you will get 58 as a count result. "GET /api/query/problem14?female=female&male=male&city1=Paris&city2=Cracow&flat=flat&house=house&land=land&include=2000000&exclude=500000 200 695.668 ms - 46" This is the response from morgan in my console. This query took 695 milliseconds to get the count. 

Learning: How to use the "countDocuments" and "count" methods to get the count of documents that match the value of specific properties. How to use $lt,  $gt $and, $or, $elemMatch, $not operator.   

### MongoDB Query - Problem 15

- Requirement: Count all the people who have exactly "10" transactions.


- It can be done in two ways: using the "countDocuments" method or using the "find" method together with the "count" method. We have to use $match operator to get the result.

- The solution is as follows

```javascript
// In queryRoutes.js file add following

router.get("/problem15", QueryControllers.problem15)



// In queryControllers.js file add following

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

export const QueryControllers = {
  problem1, problem2, problem3, problem15
}
```

- Using postman if you hit "http://localhost:5000/api/query/problem15?size=10" route you will get 179972 as a result. "GET /api/query/problem15?size=10 200 486.860 ms - 54" This is the response from morgan in my console. This query took 486 milliseconds to get the count. 

Learning: How to use the "countDocuments" and "count" methods to get the count of documents that match the value of specific properties. How to use $match operator.   

### MongoDB Query - Problem 16

- Requirement: Finds all people with "firstName" = 'Thomas' and returns only the following fields: "_id", "firstName" and "lastName".


- It can be done "find" method together with the "project" method. Three fields need to return. It will help to save bandwidth.

- The solution is as follows

```javascript
// In queryRoutes.js file add following

router.get("/problem16", QueryControllers.problem16)



// In queryControllers.js file add following

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

export const QueryControllers = {
  problem1, problem2, problem3, problem16
}
```

- Using postman if you hit "http://localhost:5000/api/query/problem16?firstName=Thomas" route you will get 5069 documents as a result. "GET /api/query/problem16?firstName=Thomas 200 2656.281 ms - 386049" This is the response from morgan in my console. This query took 2656 milliseconds to get the results. 

Learning: Searching database based on field value and returning certain fields.   

### MongoDB Query - Problem 17

- Requirement: Find everyone who has one or more transactions worth less than $5.

The returned results only include the "firstName", "lastName" and "payments" fields containing only the first word whose amount is less than 5$.


- It can be done "find" method together with the "project" or "field filtering" method. Four fields need to return. It will help to save bandwidth.

- The solution is as follows

```javascript
// In queryRoutes.js file add following

router.get("/problem17", QueryControllers.problem17)



// In queryControllers.js file add following

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

export const QueryControllers = {
  problem1, problem2, problem3, problem17
}
```

- Using postman if you hit "http://localhost:5000/api/query/problem17?amount=5" route you will get 7785 documents as a result. "GET /api/query/problem17?amount=5 200 15519.453 ms - 7730256" This is the response from morgan in my console. This query took 15 seconds to get the results. 

Learning: Searching database based on field value and returning certain fields using project and field filtering.   

### MongoDB Query - Problem 18

- Requirement: Add an element to the payments of people who are in "France" with the following structure:
{
 category: "relax",
 name: "disco",
 amount: 5.06
}

- It can be done using both "updateOne" and "updateMany" method and $addToSet method. 

- The solution is as follows

```javascript
// In queryRoutes.js file add following

router.put("/problem18", QueryControllers.problem18)



// In queryControllers.js file add following

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

export const QueryControllers = {
  problem1, problem2, problem3, problem18
}
```

- Using postman if you hit "http://localhost:5000/api/query/problem18?country=France&category=relax&name=disco&amount=5.06" route you will update 101233 documents as a result. "GET /api/query/problem18?country=France&category=relax&name=disco&amount=5.07 200 102983.157 ms - 153" This is the response from morgan in my console. This query took 102 seconds to update the documents. 

Learning: Searching database based on field value and returning certain fields.   

### MongoDB Query - Problem 19

- Requirement: Delete all of everyone's market fields.


- It can be done using $unset operator. 

- The solution is as follows

```javascript
// In queryRoutes.js file add following

router.delete("/problem19", QueryControllers.problem19)



// In queryControllers.js file add following

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
  problem1, problem2, problem3, problem16
}
```

- Using postman if you hit "http://localhost:5000/api/query/problem19" route you will modified 200000 documents as a result. "DELETE /api/query/problem19 200 124219.830 ms - 163" This is the response from morgan in my console. This query took 124 seconds to delete the data. 

Learning: Deleting value of a specific field in all documents. How to use $unset operator.