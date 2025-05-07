import { Router } from 'express'
import { addDeveloper, getAllDevelopers } from './controller/developer.controller.js';
const router = Router();

router.get("/", getAllDevelopers)
router.post("/add", addDeveloper)


export default router;