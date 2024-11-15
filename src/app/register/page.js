"use client";
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export default function Login() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-8">
      <main className="flex flex-col gap-8 items-center w-full max-w-md sm:max-w-lg">
        <Card className="w-full p-4 sm:p-8">
          <h1 className="text-4xl font-bold text-center mb-4">Login</h1>
        </Card>
      </main>
    </div>
  );
}
