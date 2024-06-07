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