import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";

import { ImUserTie } from "react-icons/im";
import { GrUserAdmin } from "react-icons/gr";
import { FaUsersLine } from "react-icons/fa6";

export const PassationPowers = () => {
    const [selected, setSelected] = React.useState('');
    const [selectedDiv, setSelectedDiv] = useState(null);

    const handleClick = (event) => {
        const value = event.currentTarget.dataset.index;

        setSelected(prevSelected => {
            if (prevSelected === value) {
                return ''; // Désélectionner si déjà sélectionné
            } else {
                return value; // Sélectionner l'élément cliqué
            }
        });
    };
    return <>
        <div>
            <div className="flex flex-col space-y-5">
                <div className={`contentpassation flex flex-row space-x-4 px-3 py-3 cursor-pointer ${selected === 'Administrateur' ? 'bg-yellow-600 text-white' : 'bg-white text-black'} hover:bg-yellow-600 hover:text-white rounded-l-lg border-r-4 border-indigo-500`} data-index='Administrateur' onClick={handleClick}>
                    <div>
                        <div className="bg-slate-400 py-2 px-2 rounded-full"><GrUserAdmin className="w-7 h-7" /></div>
                    </div>
                    <div>
                        <div className="font-medium">Administrateur</div>
                        <div>La passation de pouvoir est un processus essentiel pour assurer la continuité et l'efficacité dans une équipe
                            lorsqu'un membre clé change de rôle ou quitte l'organisation.</div>
                    </div>
                    <div className="flex items-center">
                        Administrateur
                    </div>
                </div>
                <div className={`contentpassation flex flex-row space-x-4 px-3 py-3 cursor-pointer hover:bg-yellow-600 hover:text-white rounded-l-lg border-r-4 border-yellow-500 ${selected === 'Modérateur' ? 'bg-yellow-600 text-white' : 'bg-white text-black'}`} data-index='Modérateur' onClick={handleClick}>
                    <div>
                        <div className="bg-slate-400 py-2 px-2 rounded-full"><FaUsersLine className="w-7 h-7" /></div>
                    </div>
                    <div>
                        <div className="font-medium">Modérateur</div>
                        <div>En tant que Modérateur d'une équipe, votre rôle est crucial pour le succès collectif.</div>
                    </div>
                    <div className="flex items-center">Modérateur</div>
                </div>
                <div className={`contentpassation flex flex-row space-x-4 px-3 py-3 cursor-pointer hover:bg-yellow-600 hover:text-white rounded-l-lg border-r-4 border-sky-700 ${selected === 'Éditeur' ? 'bg-yellow-600 text-white' : 'bg-white text-black'}`} data-index='Éditeur' onClick={handleClick}>
                    <div>
                        <div className="bg-slate-400 py-2 px-2 rounded-full"><ImUserTie className="w-7 h-7" /></div>
                    </div>
                    <div>
                        <div className="font-medium">Éditeur</div>
                        <div>En tant que Éditeur, votre rôle est essentiel pour le succès des projets de l'équipe.</div>
                    </div>
                    <div className="flex items-center">Éditeur</div>
                </div>
            </div>
            <div className="hidden">
                <div className="flex flex-col gap-3">
                    <CheckboxGroup
                        label="Select cities"
                        color="warning"
                        value={selected ? [selected] : []}
                        onValueChange={(values) => {
                            if (values.length === 0) {
                                setSelected('');
                            } else {
                                setSelected(values[0]);
                            }
                        }}
                    >
                        <Checkbox value="Administrateur">Administrateur</Checkbox>
                        <Checkbox value="Modérateur">Modérateur</Checkbox>
                        <Checkbox value="Éditeur">Éditeur</Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
        </div>
    </>
}