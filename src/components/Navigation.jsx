import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { Navigation as _Navigation } from 'swiper/modules';
function Navigation({ items }) {
    const [isBeginning, setIsBeginning] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const handleSlideChange = (swiper) => {
        setIsBeginning(swiper.isBeginning)
        setIsEnd(swiper.isEnd);
    };
    return (
        <div className="menu-swiper">
            <Swiper
                slidesPerView="auto"
                modules={[_Navigation]}
                onSlideChange={handleSlideChange}
                onInit={handleSlideChange}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
            >
                {
                    items.map((item, i) =>
                        <SwiperSlide key={i}>
                            <NavLink to={item.endpoint} className={({ isActive }) => isActive ? "active" : ''}>{item.label}</NavLink>
                        </SwiperSlide>)
                }
            </Swiper>
            <div ref={prevRef} className="menu-swiper-nav-prev"><i className="fi fi-sr-angle-left"></i></div>
            <div ref={nextRef} className="menu-swiper-nav-next"><i className="fi fi-sr-angle-right"></i></div>
        </div>
    )
}
export default Navigation