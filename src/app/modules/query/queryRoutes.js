import express from 'express'
import { QueryControllers } from './queryControllers.js';


const router = express.Router()

router.get("/problem1", QueryControllers.problem1)
router.get("/problem2", QueryControllers.problem2)
router.delete("/problem3", QueryControllers.problem3)
router.get("/problem4", QueryControllers.problem4)
router.get("/problem5", QueryControllers.problem5)
router.get("/problem6", QueryControllers.problem6)
router.get("/problem7", QueryControllers.problem7)
router.get("/problem8", QueryControllers.problem8)
router.get("/problem9", QueryControllers.problem9)
router.get("/problem10", QueryControllers.problem10)
router.get("/problem11", QueryControllers.problem11)
router.get("/problem12", QueryControllers.problem12)
router.get("/problem13", QueryControllers.problem13)
router.get("/problem14", QueryControllers.problem14)
router.get("/problem15", QueryControllers.problem15)
router.get("/problem16", QueryControllers.problem16)
router.get("/problem17", QueryControllers.problem17)
router.get("/problem18", QueryControllers.problem18)
router.get("/problem19", QueryControllers.problem19)
router.get("/problem20", QueryControllers.problem20)
router.get("/problem21", QueryControllers.problem21)

export const QueryRoutes = router;