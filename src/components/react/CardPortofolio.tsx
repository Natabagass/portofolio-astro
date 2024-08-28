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
    return (
        <div className="relative w-full h-[450px]">
            <div className="thecard">
                <div className="bg-secondary/50 thefront w-full h-full shadow-inner rounded-3xl flex items-start justify-start">
                    <div className="relative z-10">
                        <div className="relative w-full pt-8 pl-8 h-[450px]">
                            <img
                                src={item.img}
                                className="object-cover h-full rounded-tl-2xl rounded-br-3xl object-left w-full"
                                alt="Showcase - Portfolio"
                            />
                        </div>
                        <div
                            className={`${item.id === 4 ? "bg-secondary" : "bg-white/30"} absolute bottom-0 w-full h-[30%] flex justify-start p-4 backdrop-blur-md rounded-b-3xl`}
                        >
                            <Text weight="font-medium" Type="h3" size="h2" color="text-white">
                                {item.name}
                            </Text>
                        </div>
                    </div>
                </div>
                <div className="bg-secondary/50 p-8 theback w-full h-full shadow-inner rounded-3xl flex items-center justify-center relative">
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