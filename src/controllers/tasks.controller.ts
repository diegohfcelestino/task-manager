import type { Request, Response } from 'express';
import z from 'zod';
import { TaskUseCases } from '../useCases/TaskUseCases';

const taskUseCases = new TaskUseCases();

export class TaskController {
  async create(req: Request, res: Response) {
    try {
      const newTask = await taskUseCases.create(req.body);
      return res.status(201).json(newTask);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    const tasks = await taskUseCases.findAll();
    return res.json(tasks);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res
        .status(400)
        .json({ error: 'ID de tarefa inválido ou ausente.' });
    }
    const task = await taskUseCases.findOne(id);
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });
    return res.json(task);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res
        .status(400)
        .json({ error: 'ID de tarefa inválido ou ausente.' });
    }
    try {
      const updatedTask = await taskUseCases.update(id, req.body);
      return res.json(updatedTask);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res
        .status(400)
        .json({ error: 'ID de tarefa inválido ou ausente.' });
    }
    try {
      await taskUseCases.delete(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
  }
}
