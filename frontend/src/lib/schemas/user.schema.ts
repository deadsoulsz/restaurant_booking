import { z } from "zod";

export const updateProfileSchema = z
  .object({
    name: z
      .string()
      .min(2, "Имя должно содержать минимум 2 символа")
      .optional(),
    phone: z
      .string()
      .refine(
        (val) => !val || /^\+?[1-9]\d{1,14}$/.test(val),
        "Неверный формат телефона"
      )
      .optional(),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Пароль должен содержать заглавные и строчные буквы, а также цифры"
      )
      .optional(),
    confirmNewPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Текущий пароль обязателен для изменения пароля",
      path: ["currentPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmNewPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Пароли не совпадают",
      path: ["confirmNewPassword"],
    }
  );

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
