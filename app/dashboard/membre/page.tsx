"use client"; // Indique que ce fichier est un composant client

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

import { Avatar, AvatarIcon } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Input } from "@nextui-org/react";

import { RiUserFollowFill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";

import { Buttonui } from "@/components/ui/button";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";

import { Navbardashboardright } from '@/components/navbardashboardright';
import { Navbardashboardtop } from '@/components/navbardashboardtop';
import { PassationPowers } from '@/components/passationpowers';
import { SelectProfilPhoto } from '@/components/selectprofilphoto';

export default function MembrePage() {
    const [user, setUser] = useState<{ _id: string; name: string; email: string; role: string; profilePhoto?: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [imageSrc, setImageSrc] = useState(null);
    const [editing, setEditing] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [profilePhoto, setProfilePhoto] = useState();
    const [filephoto, setFilephoto] = useState<File | null>(null);
    const [message, setMessage] = useState('');

    const toggleVisibility = () => setIsVisible(!isVisible);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/me', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                    setName(data.name); // Set name after fetching user
                    setEmail(data.email); // Set email after fetching user
                    setProfilePhoto(data.profilePhoto || '');
                } else {
                    router.push('/login'); // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    const handleAvatarClick = () => {
        setEditing(true);
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (e.target.files) {
            setFilephoto(e.target.files[0]);
        }
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = async () => {
            setImageSrc(reader.result as string);
            setEditing(false);
        };

        reader.readAsDataURL(file);

    };

    const updateUserProfile = async (fileUrl) => {
        try {
            const res = await fetch(`/api/updateProfile/${user?._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name,
                    email,
                    profilePhoto: fileUrl,
                }),
            });

            if (res.ok) {
                setMessage('Profile updated successfully');
                window.location.reload(); // Rafraîchir la page pour refléter les modifications
            } else {
                const errorData = await res.json();
                setMessage(`Error updating profile: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error updating profile');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({ email, prenom, password, name, role }),
            });

            if (res.ok) {
                onOpen();
            } else {
                const data = await res.json();
                // setError(data.message);
            }
        } catch (error) {
            console.error('Request error:', error);
            // setError('Une erreur non prévue s\'est produite lors de la tentative d\'inscription');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {user ? (
                <div className="flex min-h-screen w-full flex-col bg-muted/40">
                    <Navbardashboardright />
                    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                        <Navbardashboardtop profilePhoto={profilePhoto} />
                        <main className="p-4">
                            <div className='flex flex-row space-x-11'>
                                <div>
                                    <div className='contentProfilUser'>
                                        <div className='flex flex-col space-y-5 px-3 py-3'>
                                            <div className="flex items-center justify-center">
                                                <div>
                                                    <Avatar
                                                        {...(profilePhoto
                                                            ? { src: profilePhoto }
                                                            : { icon: <AvatarIcon /> })}
                                                        classNames={{
                                                            base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                                                            icon: "text-black/80",
                                                        }}
                                                        className='w-32 h-32'
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex flex-col space-y-3'>
                                                <div className="flex justify-center gap-4">
                                                    <Chip
                                                        startContent={<FaUser className='w-3.5 h-3.5' />}
                                                        variant="faded"
                                                        color="success"
                                                    >
                                                        Nom: {user.name}
                                                    </Chip>
                                                </div>
                                                <div className="flex justify-center gap-4">
                                                    <Chip
                                                        startContent={<MdEmail className='w-3.5 h-3.5' />}
                                                        variant="faded"
                                                        color="success"
                                                    >
                                                        Email: {user.email}
                                                    </Chip>
                                                </div>
                                                <div className="flex justify-center gap-4">
                                                    <Chip color="success" variant="dot">{user.role}</Chip>
                                                </div>
                                                <div className="flex justify-center gap-4">
                                                    <Chip color="success" variant="shadow">Connecté</Chip>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='relative contentProfilUserDetail py-5 px-5'>
                                    <div>
                                        <div>
                                            <h1 className='text-2xl font-semibold'>Membre</h1>
                                        </div>
                                    </div>
                                    <div>
                                        <form onSubmit={handleSubmit}>
                                            <div>
                                                <div>
                                                    <SelectProfilPhoto />
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-2 gap-8'>
                                                <div>
                                                    <Input type="text" variant='underlined' label="Nom du membre" />
                                                </div>
                                                <div>
                                                    <Input type="text" variant='underlined' label="Prénom du membre" />
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-2 gap-8'>
                                                <div>
                                                    <Input type="email" variant='underlined' label="Email du membre" />
                                                </div>
                                                <div>
                                                    <Input
                                                        label="Password"
                                                        variant="underlined"
                                                        placeholder="Enter your password"
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
                                                        className="max-w-xs"
                                                    />
                                                </div>
                                            </div>
                                            <div className='mt-5'>
                                                <div>
                                                    <PassationPowers />
                                                </div>
                                            </div>
                                            <div className='mt-5 flex justify-center w-full'>
                                                {/* <Button type='submit' color="success" className='w-full'>
                                                    Enregister
                                                </Button> */}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            ) : (
                <div>Aucun utilisateur trouvé</div>
            )}
        </div>
    );
}
