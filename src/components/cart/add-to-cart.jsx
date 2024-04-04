"use client";
import { add } from "@/app/(user)/store/slice/cartSlice";
import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
// import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import LoadingDots from "../loading-dots";
import { API_BASE_URL } from "@/app/(user)/config/constants";
import { getToken } from "@/app/(user)/config/actions";

function SubmitButton({ selectedVariantId, productId }) {
  const [cart, setCart] = useState([]);
  const [itemAdd, setItemAdd] = useState(false);
  const [token, setToken] = useState();
  const dispatch = useDispatch();
  const pending = false;

  useEffect(() => {
    (async () => {
      const retrievedToken = await getToken();
      setToken(retrievedToken);
    })();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    var product;
    try {
      const response = await axios.get(`${API_BASE_URL}products/${productId}`);
      product = await response.data.data;
    } catch (error) {
      console.log(error);
    }

    if (token) {
      const addItemInDb = () => {
        axios.post(
          `${API_BASE_URL}add-to-cart`,
          {
            product_id: product.id,
            quantity: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token?.tokenId}`,
            },
          }
        );
      };

      addItemInDb();
    } else {
      dispatch(
        add({
          id: product.id,
          price: product.price,
          quantity: 1,
          variantId: selectedVariantId,
          title: product.name,
          image: product.images[0].image,
        })
      );
    }

    toast.success("Add to Cart Successfully!", {
      position: "bottom-right",
    });
    setItemAdd(!itemAdd);
  };

  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-full bg-orange-600 p-4 tracking-wide text-white";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  return (
    <button
      onClick={(e) => handleAdd(e)}
      aria-label="Add to cart"
      aria-disabled={pending}
      className={clsx(buttonClasses, {
        "hover:opacity-90": true,
        disabledClasses: pending,
      })}>
      <div className="absolute left-0 ml-4">
        {pending ? (
          <LoadingDots className="mb-3 bg-white" />
        ) : (
          <PlusIcon className="h-5" />
        )}
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({ productId }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <form>
      {" "}
      <SubmitButton productId={productId} setIsOpen={setIsOpen} />
      <p aria-live="polite" className="sr-only" role="status"></p>
    </form>
  );
}
