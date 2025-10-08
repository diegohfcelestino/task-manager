import type { Request, Response } from 'express';
import { UserUseCases } from '../useCases/UserUseCases.js';
import z from 'zod';

const userUseCases = new UserUseCases();

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const newUser = await userUseCases.create(req.body);
      return res.status(201).json(newUser);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    const users = await userUseCases.findAll();
    return res.json(users);
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (typeof id !== 'string' || !id) {
        return res.status(400).json({ error: 'Id Do usuário inválido.' });
      }
      const user = await userUseCases.findOne(id);
      if (!user)
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      return res.json(user);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    if (typeof id !== 'string' || !id) {
      return res.status(400).json({ error: 'Id Do usuário inválido.' });
    }
    try {
      const updatedUser = await userUseCases.update(id, req.body);
      return res.json(updatedUser);
    } catch (error: any) {
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ error: error.message });
      }
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Id do usuário é inválido.' });
    }
    try {
      await userUseCases.delete(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
  }
}
