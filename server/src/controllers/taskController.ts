import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  assignedUserId?: number;
}

export const getTasks = async (req: Request, res: Response):
Promise<void> => {
  const { projectId } = req.query;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },  
    });
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving tasks: ${error.message} ` });
  }
};

export const createTask = async (req: Request, res: Response):
Promise<void> => {
  const { 
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    authorUserId,
    assignedUserId
   } = req.body;    
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId
      },
    });
    res.status(201).json(newTask);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating task: ${error.message}` });
  }
};

export const updateTaskStatus = async (req: Request, res: Response):
Promise<void> => {
  const { taskId } = req.params;
  const { status } = req.body;
  try {
    const updatedTasks = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        status: status,
      },  
    });
    res.json(updatedTasks);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating tasks: ${error.message} ` });
  }
};


export const updateTask = async (req: Request<{ taskId: string }, {}, UpdateTaskRequest>, res: Response):
Promise<void> => {
  const { taskId } = req.params;
  const updateData = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: updateData,
      include: {
        author: true,
        assignee: true,
//        comments: true,
//        attachments: true,
      },
    });
    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating task: ${error.message}` });
  }
};

export const getUserTasks = async (req: Request, res: Response):
Promise<void> => {

  const { userId } = req.params

  try {
    const tasks = await prisma.task.findMany({
      where: {
        // get data using the following where clauses
        // authorUserId: Number(userId),
        // assignedUserId: Number(userId)
        OR: [
          { authorUserId: Number(userId) },
          { assignedUserId: Number(userId) }
        ]
      },
      include: {
        author: true,
        assignee: true,
      },  
    });
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving user's tasks: ${error.message} ` });
  }
};

export const resetTaskSequence = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await prisma.$executeRaw`
      SELECT setval(pg_get_serial_sequence('"Task"', 'id'), coalesce(max(id)+1, 1), false) FROM "Task"
    `;
    
    console.log('Task sequence reset result:', result);
    res.json({ message: 'Task sequence reset successfully', result });
  } catch (error: any) {
    console.error('Task sequence reset error:', error);
    res.status(500).json({ message: `Error resetting task sequence: ${error.message}` });
  }
};
