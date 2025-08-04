import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response):
Promise<void> => {

  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving users: ${error.message} ` });
  }
};

// get user information for a cogito id
export const getUser = async (req: Request, res: Response):
Promise<void> => {
  // grab cognito id from request
  const { cognitoId } = req.params;
  try {
    // find user by cognito id
    const user = await prisma.user.findUnique({
      where: {
        cognitoId: cognitoId,
      },
    });
    
    res.json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving user: ${error.message}` });
  }
};

// create an async function that call prisma.user.create with username, cognito id, profilePictureURL, and team id,
// and return the user object, and handle any errors. 

export const postUser = async (req: Request, res: Response) => {
  
  try {
    const { username, cognitoId, profilePictureUrl = "i1.jpg", teamId = 1 } = req.body;
    const newUser = await prisma.user.create({
      data: {
        username,
        cognitoId,
        profilePictureUrl,
        teamId,
      },
    });
    res.json(newUser);
  } catch (error: any) {
    res
      .status(500).
      json({ message: `Error creating user: ${error.message} ` });
  }
};