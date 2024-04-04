"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { cartProducts } from "@/dummyData/sliderData";
import Link from "next/link";

// import "./slider-style.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { GridTileImage } from "../grid/tile";

export default async function RelatedProducts({ id }) {
  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const relatedProducts = [...cartProducts, ...cartProducts, ...cartProducts];
  // const relatedProducts = await cartProducts;

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1 ">
        <Swiper
          rewind={true}
          loop={true}
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            // delay: 0,
            disableOnInteraction: false,
          }}
          // pagination={{
          //   clickable: true,
          // }}
          modules={[Autoplay, Pagination]}
          className="">
          {relatedProducts.map((product, i) => (
            <SwiperSlide
              key={i}
              className="transition transform 0.2s ease-in-out">
              <li
                key={`${product.id}${i}`}
                className="aspect-square w-full flex-none mx-auto">
                <Link
                  href={`/product/${product.id}`}
                  className="elative h-full w-full">
                  <GridTileImage
                    alt={product.title}
                    label={{
                      title: product.title,
                      amount: product.price,
                      currencyCode: "USD",
                    }}
                    src={product.image}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  />
                </Link>
              </li>
            </SwiperSlide>
          ))}
        </Swiper>
      </ul>
    </div>
  );
}
