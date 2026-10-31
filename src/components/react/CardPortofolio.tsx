import { useRef, useState, type KeyboardEvent } from "react";
import { gsap } from "gsap";
import Links from "./Links";
import Text from "./Typography";

interface Props {
    id: number,
    img: string,
    name: string,
    path: string,
    desc: string
}

const CardPortofolio = (item: Props) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const [isFlipped, setIsFlipped] = useState(false);

    const animateFlip = (showDetails: boolean) => {
        if (!innerRef.current) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        gsap.to(innerRef.current, {
            rotationY: showDetails ? 180 : 0,
            duration: reduceMotion ? 0 : 0.6,
            ease: "power2.inOut",
            transformOrigin: "50% 50%",
            force3D: true,
            overwrite: "auto",
        });
    };

    const showDetails = () => {
        setIsFlipped(true);
        animateFlip(true);
    };

    const openDetails = () => {
        setIsFlipped(false);
        animateFlip(false);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape" && isFlipped) {
            openDetails();
        }
    };

    return (
        <div
            className="portfolio-card relative w-full h-[450px]"
            onKeyDown={handleKeyDown}
        >
            <div ref={innerRef} className="portfolio-card__inner">
                <div className="portfolio-card__face portfolio-card__front bg-secondary/50 w-full h-full shadow-inner rounded-3xl flex items-start justify-start">
                    <div className="relative z-10">
                        <div className="relative w-full pt-8 pl-8 h-[450px]">
                            <img
                                src={item.img}
                                className="object-cover h-full rounded-tl-2xl rounded-br-3xl object-left w-full"
                                alt="Showcase - Portfolio"
                            />
                        </div>
                        <div className={`${item.id === 4 ? "bg-secondary" : "bg-white/30"} absolute bottom-0 w-full h-[30%] flex items-end justify-between gap-3 p-4 backdrop-blur-md rounded-b-3xl`}>
                            <Text weight="font-medium" Type="h3" size="h2" color="text-white">
                                {item.name}
                            </Text>
                            <button
                                type="button"
                                onClick={showDetails}
                                aria-label={`Show details for ${item.name}`}
                                aria-pressed={isFlipped}
                                className="shrink-0 rounded-full border border-white/30 bg-black/30 px-3 py-2 text-sm text-white transition-colors hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-200"
                            >
                                Details
                            </button>
                        </div>
                    </div>
                </div>
                <div className="portfolio-card__face portfolio-card__back bg-secondary/50 p-8 w-full h-full shadow-inner rounded-3xl flex items-center justify-center relative">
                    <button
                        type="button"
                        onClick={openDetails}
                        aria-label={`Show ${item.name} preview`}
                        className="absolute right-5 top-5 rounded-full border border-white/25 px-3 py-2 text-sm text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-200"
                    >
                        Show preview
                    </button>
                    <div className="flex flex-col gap-4">
                        <Text weight="font-semibold" Type="h3" size="h2" color="text-white">
                            {item.name}
                        </Text>
                        <Text weight="font-normal" Type="p" size="p1" color="text-white">
                            {item.desc}
                        </Text>
                        <div className="mt-4">
                            <Links target="_blank" padding="px-6 py-3" variant="primary" href={item.path}>
                                Click Here!
                            </Links>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardPortofolio;
