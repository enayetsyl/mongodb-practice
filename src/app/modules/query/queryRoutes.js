import express from 'express'
import { QueryControllers } from './queryControllers.js';


const router = express.Router()

router.get("/problem1", QueryControllers.problem1)
router.get("/problem2", QueryControllers.problem2)
router.delete("/problem3", QueryControllers.problem3)
router.get("/problem4", QueryControllers.problem4)
router.get("/problem5", QueryControllers.problem5)


export const QueryRoutes = router;