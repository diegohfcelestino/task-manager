import { prisma } from '../prisma/client';
import { z } from 'zod';

const userSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome muito longo'),
  email: z.string().email('Email inválido').max(255, 'Email muito longo')
});

export class UserUseCases {
  async create(body: { name: string; email: string }) {
    const { name, email } = userSchema.parse(body);
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Já existe um usuário com este e-mail.');
    }
    return await prisma.user.create({ data: { name, email } });
  }

  async findAll() {
    return await prisma.user.findMany();
  }

  async findOne(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, body: any) {
    const partialUserSchema = userSchema.partial();
    const validatedData = partialUserSchema.parse(body);

    if (Object.keys(validatedData).length === 0) {
      throw new Error(
        'Pelo menos um campo (name ou email) deve ser fornecido para atualização'
      );
    }
    const prismaUpdateData: Record<string, any> = {};
    if (validatedData.name !== undefined) {
      prismaUpdateData.name = { set: validatedData.name };
    }
    if (validatedData.email !== undefined) {
      prismaUpdateData.email = { set: validatedData.email };
    }

    return await prisma.user.update({
      where: { id },
      data: prismaUpdateData
    });
  }

  async delete(id: string) {
    return await prisma.user.delete({ where: { id } });
  }
}
