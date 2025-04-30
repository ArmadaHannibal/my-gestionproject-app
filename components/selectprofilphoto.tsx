"use client"; // Indique que ce fichier est un composant client

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Avatar, AvatarIcon } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Checkbox } from "@/components/ui/checkbox";


export const SelectProfilPhoto = () => {
    const [editing, setEditing] = useState(false);
    const [filephoto, setFilephoto] = useState<File | null>(null);
    const [imageSrc, setImageSrc] = useState(null);

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

    return <>
        <div className="flex items-center space-x-2 my-5">
            <div onClick={handleAvatarClick}>
                <Avatar
                    {...(imageSrc
                        ? { src: imageSrc }
                        : { icon: <AvatarIcon /> })}
                    classNames={{
                        base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                        icon: "text-black/80",
                    }}
                    className='w-32 h-32 cursor-pointer'
                />
            </div>
            {editing && (
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    ref={input => input && input.click()} // Pour déclencher le champ de fichier
                />
            )}
        </div>
    </>
}