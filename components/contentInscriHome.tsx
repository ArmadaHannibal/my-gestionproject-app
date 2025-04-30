"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import ShinyButton from "@/components/magicui/shiny-button";
import { Button } from "@nextui-org/react";


export const ContentHomeInscription = () => {
    return (
        <>
            <div>
                <div className="flex flex-nowrap justify-between contentrejoindre mt-10">
                    <div className='' data-aos="fade-up" data-aos-duration="3000">
                        <Image src={'/Revenue-pana.svg'} width={400} height={400} alt="Dashboard-pana" />
                    </div>
                    <div className="flex flex-col space-y-9">
                        <div className="space-y-9">
                            <div className="" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
                                <h2 className="text-5xl font-semibold border-l-4 border-amber-600 pl-2">Nous rejoindre</h2>
                            </div>
                            <div className="" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
                                <p className="w-96 pb-4">
                                    Inscrivez-vous dès maintenant et optimisez la gestion de vos projets !
                                </p>
                                <div className="w-auto flex justify-end">
                                    <div className="border-b-4 border-amber-600 w-28"></div>
                                </div>
                            </div>
                        </div>
                        <div className=" text-end" data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-delay="300" data-aos-offset="0">
                            <Button color="warning" variant="shadow" className="text-white font-semibold px-10 py-6">
                                S'inscrire
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}