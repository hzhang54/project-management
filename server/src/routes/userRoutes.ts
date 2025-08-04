import { Router } from "express";
import { getUser, getUsers, postUser } from "../controllers/userController";

const router = Router();
router.get("/", getUsers);

// add a router for postUser from userController.ts
router.post("/", postUser);
// add a router for getUser from userController.ts, passing in cognitoId as a parameter
router.get("/:cognitoId", getUser);

export default router;