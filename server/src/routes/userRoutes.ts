import { Router } from "express";
import { getUsers, postUser } from "../controllers/userController";

const router = Router();
router.get("/", getUsers);

// add a router for postUser from userController.ts
router.post("/", postUser);

export default router;