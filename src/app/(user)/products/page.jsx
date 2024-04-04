"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { API_BASE_URL } from "../config/constants";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        setIsLoading(true);

        const response = await axios.get(`${API_BASE_URL}/view-all-products`);
        
        setProducts(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <MaxWidthWrapper>
      <div className=" my-12 m-auto font-tec grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-2 gap-y-3 ">
        {products.map((product, index) => (
          <Link key={index} href={`${API_BASE_URL}/products/${product.id}`}>
            <div className="flex flex-col justify-center items-center border-[1px] border-red-300 rounded-3xl h-64 hover:scale-105  shadow-xl bg-gray-100 hover:bg-base-200">
              <div className="mx-3">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${product.image}`}
                  alt=""
                  width={300}
                  height={300}
                  className="h-32"
                />
              </div>
              <h3 className="text-lg text-center mt-4">{product.name}</h3>
              <p className="font-secondary text-center text-primary">
                {"$"}
                {`${product.price}`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default Products;
