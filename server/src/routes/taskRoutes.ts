import { Router } from "express";

import { createTask, getTasks, getUserTasks, updateTask, updateTaskStatus, resetTaskSequence } from "../controllers/taskController";


const router = Router();
router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:taskId/status", updateTaskStatus);
router.patch("/:taskId", updateTask);
// add a get rounter for getUserTasks passing in userId
router.get("/user/:userId", getUserTasks);

router.post("/reset-sequence", resetTaskSequence); // Add this line

export default router;
