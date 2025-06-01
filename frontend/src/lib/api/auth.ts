import { apiClient } from "./client";
import { User, AuthTokens, LoginCredentials, RegisterData } from "@/types/user";
import { ApiResponse } from "@/types/api";

export const authApi = {
  // Регистрация
  async register(
    data: RegisterData
  ): Promise<ApiResponse<AuthTokens & { user: User }>> {
    const response = await apiClient.instance.post("/auth/register", data);
    const { accessToken, refreshToken } = response.data.data;

    // Сохраняем токены
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
    }

    return response.data;
  },

  // Вход
  async login(
    credentials: LoginCredentials
  ): Promise<ApiResponse<AuthTokens & { user: User }>> {
    const response = await apiClient.instance.post("/auth/login", credentials);
    const { accessToken, refreshToken } = response.data.data;

    // Сохраняем токены
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
    }

    return response.data;
  },

  // Выход
  async logout(): Promise<void> {
    try {
      await apiClient.instance.post("/auth/logout");
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    }
  },

  // Получить текущего пользователя
  async getMe(): Promise<ApiResponse<User>> {
    const { data } = await apiClient.instance.get("/auth/me");
    return data;
  },

  // Обновить профиль
  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    const response = await apiClient.instance.patch("/auth/profile", data);
    return response.data;
  },

  // Запросить сброс пароля
  async requestPasswordReset(
    email: string
  ): Promise<ApiResponse<{ message: string }>> {
    const { data } = await apiClient.instance.post("/auth/forgot-password", {
      email,
    });
    return data;
  },

  // Сбросить пароль
  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<ApiResponse<{ message: string }>> {
    const { data } = await apiClient.instance.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return data;
  },
};
