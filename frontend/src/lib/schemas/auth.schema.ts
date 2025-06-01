import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email обязателен").email("Неверный формат email"),
  password: z
    .string()
    .min(1, "Пароль обязателен")
    .min(6, "Пароль должен содержать минимум 6 символов"),
});

export const registerSchema = z
  .object({
    email: z.string().min(1, "Email обязателен").email("Неверный формат email"),
    password: z
      .string()
      .min(1, "Пароль обязателен")
      .min(6, "Пароль должен содержать минимум 6 символов")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Пароль должен содержать заглавные и строчные буквы, а также цифры"
      ),
    confirmPassword: z.string().min(1, "Подтверждение пароля обязательно"),
    name: z
      .string()
      .min(1, "Имя обязательно")
      .min(2, "Имя должно содержать минимум 2 символа"),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^\+?[1-9]\d{1,14}$/.test(val),
        "Неверный формат телефона"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
