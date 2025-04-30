"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";

export const ContentHomeAbout = () => {
    return (
        <div className="relative overflow-hidden h-auto mt-14">
            <div className="flex flex-nowrap">
                <div className="space-y-9">
                    <div className="" data-aos="fade-up">
                        <h1 className="text-5xl font-semibold border-l-4 border-amber-600 pl-2">NexProject</h1>
                    </div>
                    <div className="" data-aos="fade-up">
                        <p className="w-96 pb-4">
                            Chez NexProject, nous nous engageons à transformer la manière dont les équipes gèrent et suivent
                            leurs projets. Notre plateforme est conçue pour offrir une vue d'ensemble claire, faciliter la
                            collaboration et optimiser l'efficacité des équipes, qu'elles soient petites ou grandes.
                        </p>
                        <div className="w-auto flex justify-end">
                            <div className="border-b-4 border-amber-600 w-28"></div>
                        </div>
                    </div>
                </div>
                <div className='' data-aos="fade-left">
                    <Image src={'/Dashboard-pana.svg'} width={700} height={700} alt="Dashboard-pana" />
                </div>
            </div>
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                    "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                )}
            />
        </div>
    );
}