import React from "react";
import Slider from "./Swiper";
import { allSlides } from "@/dummyData/sliderData";
const HeroSection = () => {
  return (
    <div className="w-full">
      <Slider slides={allSlides} />
    </div>
  );
};

export default HeroSection;
