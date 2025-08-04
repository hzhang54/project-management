import { Router } from "express";
import { createProject, getProjects, resetProjectSequence } from "../controllers/projectController";

const router = Router();
router.get("/", getProjects);
router.post("/", createProject);
router.post("/reset-sequence", resetProjectSequence);


export default router;
