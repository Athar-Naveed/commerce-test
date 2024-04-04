"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider-style.css";

import Image from "next/image";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Button } from "./ui/button";

const Slider = ({ slides }) => {
  return (
    <>
      <div className="relative min-w-full">
        <Swiper
          rewind={true}
          loop={true}
          slidesPerView={"auto"}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="">
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="">
              {
                <div className="font-tec relative flex mt-12 h-[500px] sm:h-96">
                  <div className={`${slide.style} `}>
                    <div className="flex-1 flex justify-center items-center">
                      <div className=" ">
                        <h1 className="w-96 font-medium mb-6 text-2xl ">
                          {slide.title}
                        </h1>
                        <p className="w-96">{slide.description}</p>

                        <Button className=" mt-12 w-32">Shop Now</Button>
                      </div>
                    </div>
                    <div className="flex-1 ">
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        priority={true}
                        width={320}
                        height={320}
                        className="w-96 h-60 object-cover flex justify-center items-center"
                      />
                    </div>
                  </div>
                </div>
              }
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
