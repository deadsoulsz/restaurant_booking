"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { UpdateProfileForm } from "@/components/profile/update-profile-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProfileSettingsPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Настройки профиля</h1>

        <Card>
          <CardHeader>
            <CardTitle>Личная информация</CardTitle>
            <CardDescription>Обновите свои данные</CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateProfileForm />
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
}
