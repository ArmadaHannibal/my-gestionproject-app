"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from "next/image";
import Link from "next/link";
import { Buttonui } from "@/components/ui/button";
import { Inputui } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@nextui-org/react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('/api/login', { email, password });

      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        router.push('/dashboard/profile');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Une erreur non prévue s\'est produite lors de la tentative de connexion');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Se connecter</h1>
              <p className="text-balance text-muted-foreground">
                Connectez-vous pour accéder à votre tableau de bord !
              </p>
            </div>
            {error && <Alert variant="destructive" className='bg-red-700 text-white'>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Inputui
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Inputui
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    required
                  />
                </div>
                <div className='flex space-x-2'>
                  <div className='w-full'>
                    <Buttonui type="submit" className="w-full" disabled={loading}>
                      Se connecter
                    </Buttonui>
                  </div>
                  <div>
                    {loading && <Spinner color="warning" />}
                  </div>
                </div>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Vous n'avez pas de compte ?{" "}
              <Link href="/register" className="underline">
                inscrivez-vous
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <Image
            src={"/Computer login-amico.svg"}
            alt="Image"
            width="1920"
            height="780"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale imglogin"
          />
        </div>
      </div>
    </div>
  );
}
