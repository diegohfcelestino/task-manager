import { prisma } from '../prisma/client';
import { z } from 'zod';

const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(255, 'Título muito longo'),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .max(1000, 'Descrição muito longa'),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE']).default('PENDING'),
  userId: z.string().uuid('ID do usuário deve ser um UUID válido')
});

export class TaskUseCases {
  async create(body: any) {
    const { title, description, status, userId } = taskSchema.parse(body);
    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      throw new Error('Usuário não encontrado.');
    }
    return await prisma.task.create({
      data: { title, description, status, userId }
    });
  }

  async findAll() {
    return await prisma.task.findMany({
      include: {
        user: {
          select: { name: true }
        }
      }
    });
  }

  async findOne(id: string) {
    return await prisma.task.findUnique({ where: { id } });
  }

  async update(id: string, body: any) {
    const { title, description, status } = taskSchema.partial().parse(body);
    const data: Record<string, any> = {};
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (status !== undefined) data.status = status;
    return await prisma.task.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    return await prisma.task.delete({ where: { id } });
  }
}
