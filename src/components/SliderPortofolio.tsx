import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';

import '../style/style.css';
import Text from "./Typography";

const SliderPortofolio = () => {
    return (
        <div className="flex flex-row w-full">
            <Swiper
                modules={[Pagination, Mousewheel]}
                mousewheel={{
                    enabled: true,
                }}
                freeMode={{
                    enabled: true,
                    sticky: false,
                    momentumBounce: false
                }}
                breakpoints={{
                    1275: {
                        slidesPerView: 3.5,
                        spaceBetween: 20,
                    },
                    952: {
                        slidesPerView: 2.5,
                        spaceBetween: 10,
                    },
                    716: {
                        slidesPerView: 2.5,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 2.5,
                        spaceBetween: 10,
                    },
                    500: {
                        slidesPerView: 2.5,
                        spaceBetween: 5,
                    },
                    300: {
                        slidesPerView: 1.5,
                        spaceBetween: 5,
                    },
                }}
                className="mySwiper mt-4"
            >
                {data.map((item) => (
                    <SwiperSlide
                        key={item.id}
                        className="bg-secondary/50 w-full shadow-inner rounded-3xl flex items-start justify-start"
                    >
                        <a href={item.path} target="_blank">
                            <div className="relative w-full pt-8 pl-8 h-[450px]">
                                <img
                                    src={item.img}
                                    className="object-cover rounded-tl-2xl rounded-br-3xl object-left w-full"
                                    alt="Showcase - Portfolio"
                                />
                            </div>
                            <div className={`${item.id === 4 ? 'bg-secondary' : 'bg-white/30'} absolute bottom-0 w-full h-[30%] flex justify-start p-4 backdrop-blur-lg rounded-b-3xl`}>
                                <Text weight="font-medium" Type="h3" size="h2" color="text-white">
                                    {item.name}
                                </Text>
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SliderPortofolio;

const data = [
    {
        id: 1,
        name: 'Avanzu',
        img: '/images/avanzu.png',
        path: 'https://yoavanzu.com'
    },
    {
        id: 2,
        name: 'Hodlmagz',
        img: '/images/hodlmagz.png',
        path: 'https://hodlmagz.com'
    },
    {
        id: 3,
        name: 'Mashida',
        img: '/images/mashida.png',
        path: 'https://mashida.vercel.app'
    },
    {
        id: 4,
        name: 'Metroreload',
        img: '/images/metroreload.png',
        path: 'https://metroreload.biz'
    },
]