import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

export type CreateUserType = z.infer<typeof createUserSchema>;
