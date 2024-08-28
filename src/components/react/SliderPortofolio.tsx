import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';

import Text from "./Typography";
import CardPortofolio from "./CardPortofolio";

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
                    <SwiperSlide key={item.id}>
                        <CardPortofolio
                            id={item.id}
                            img={item.img}
                            desc={item.desc}
                            name={item.name}
                            path={item.path}
                        />
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
        path: 'https://yoavanzu.com',
        desc: 'Avanzu is a platform for learning according to the topic you want to learn'
    },
    {
        id: 2,
        name: 'Hodlmagz',
        img: '/images/hodlmagz.png',
        path: 'https://hodlmagz.com',
        desc: 'Hodlmagz is a platform where you want to learn about crypto, Know some event about crypto, and other things about crypto.'
    },
    {
        id: 3,
        name: 'Mashida',
        img: '/images/mashida.png',
        path: 'https://mashida.vercel.app',
        desc: 'Mashida is a company profile website that has been restyled for their old website'
    },
    {
        id: 4,
        name: 'Metroreload',
        img: '/images/metroreload.png',
        path: 'https://metroreload.biz',
        desc: 'Metroreload is a company profile website'
    },
]