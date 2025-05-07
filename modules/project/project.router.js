import { Router } from 'express'
import { getAllProjects, getProjectById, addProject, updateProject, deleteProject } from './controller/project.controller.js';
const router = Router();

router.get("/", getAllProjects)
router.post("/add", addProject)
router.put("/:id", updateProject)
router.delete("/:id", deleteProject)
router.get("/:id", getProjectById)


export default router;