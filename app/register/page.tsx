"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Buttonui } from "@/components/ui/button";
import { Inputui } from "@/components/ui/input";
import {Input} from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = { name, email, password, role };

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        onOpen();
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('Request error:', error);
      setError('Une erreur non prévue s\'est produite lors de la tentative d\'inscription');
    } finally {
      setLoading(false);
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">S'inscrire</h1>
              <p className="text-balance text-muted-foreground">
                Inscrivez-vous dès maintenant et optimisez la gestion de vos projets !
              </p>
            </div>

            {error && (
              <Alert variant="destructive" className='bg-red-700 text-white'>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nom</Label>
                  <Inputui
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
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
                <div className="grid gap-2 contentPass">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id='password'
                    variant="bordered"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endContent={
                      <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-full"
                    style={{ borderRadius: '1px!important' }}
                    required
                  />
                </div>
                <div className='flex space-x-2'>
                  <div className='w-full'>
                    <Buttonui type="submit" className="w-full" disabled={loading}>
                      S'inscrire
                    </Buttonui>
                  </div>
                  <div>
                    {loading && <Spinner color="warning" />}
                  </div>
                </div>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Vous avez un compte ?{" "}
              <Link href={'/login'} className="underline">
                connectez-vous
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <Image
            src="/Visual data-pana.svg"
            alt="Image"
            width="1920"
            height="780"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>

      <Modal backdrop="opaque" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Enregistrement réussi</ModalHeader>
          <ModalBody>
            <div className='flex justify-center'>
              <Image src={'/image_processing20210904-26902-1xjsunp.gif'} width={200} height={200} alt='Success' />
            </div>
          </ModalBody>
          <ModalFooter>
            <Buttonui color="danger" variant="light" as={Link} href={'/'}>
              Accueil
            </Buttonui>
            <Buttonui color="primary" as={Link} href={'/login'}>
              Connectez-vous
            </Buttonui>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
