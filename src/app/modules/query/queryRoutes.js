import express from 'express'
import { QueryControllers } from './queryControllers.js';


const router = express.Router()

router.get("/problem1", QueryControllers.problem1)
router.get("/problem2", QueryControllers.problem2)


export const QueryRoutes = router;