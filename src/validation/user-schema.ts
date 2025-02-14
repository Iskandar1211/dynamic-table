import { z } from "zod";

export const createUserSchema = z.object({
  id: z.number().optional(),
  name: z
    .string({
      required_error: "Имя обязательно для заполнения",
    })
    .min(2, "Минимальная длина имени - 2 символа")
    .max(50, "Максимальная длина имени - 50 символов"),
  username: z
    .string({
      required_error: "Имя пользователя обязательно для заполнения",
    })
    .min(3, "Минимальная длина имени пользователя - 3 символа")
    .max(30, "Максимальная длина имени пользователя - 30 символов"),
  email: z.string().email("Некорректный формат email"),
  address: z
    .string({
      required_error: "Улица обязательна для заполнения",
    })
    .min(3, "Минимальная длина улицы - 3 символа")
    .max(50, "Максимальная длина улицы - 50 символов"),
  phone: z
    .string({
      required_error: "Телефон обязателен для заполнения",
    })
    .min(7, "Минимальная длина телефона - 7 символов")
    .max(15, "Максимальная длина телефона - 15 символов"),
  website: z
    .string({
      required_error: "Вебсайт обязателен для заполнения",
    })
    .min(3, "Минимальная длина имени пользователя - 3 символа")
    .max(30, "Максимальная длина имени пользователя - 30 символов"),
  company: z
    .string({
      required_error: "Улица обязательна для заполнения",
    })
    .min(3, "Минимальная длина улицы - 3 символа")
    .max(50, "Максимальная длина улицы - 50 символов"),
});

export type CreateUserType = z.infer<typeof createUserSchema>;
