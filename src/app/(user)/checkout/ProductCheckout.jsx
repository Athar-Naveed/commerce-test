"use client";
import DeleteItemButton from "@/components/cart/delete-item-button";
import CartModal from "@/components/cart/modal";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Price from "@/components/price";
import { EditItemQuantityButton } from "@/components/cart/edit-item-quantity-button";
import CloseCart from "@/components/cart/close-cart";
import Image from "next/image";

const ProductCheckout = () => {
  const cart = useSelector((state) => state.cart);
  const totalAmount = cart?.reduce(
    (accumulator, current) => accumulator + current.price * current.quantity,
    0
  );

  const totalQuantity = cart?.reduce(
    (accumulator, current) => accumulator + current.quantity,
    0
  );
  return (
    <div className="flex h-auto flex-col justify-between overflow-hidden p-1">
      <ul className="flex-grow overflow-auto py-4">
        {cart?.map((item, i) => {
          return (
            <li
              key={i}
              className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700">
              <div className="relative flex w-full flex-row justify-between px-1 py-4">
                <div className="z-30 flex flex-row space-x-4">
                  <div className="relative h-16 w-16  overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                    <Image
                      className="h-full w-full object-cover"
                      width={64}
                      height={64}
                      alt={item.title}
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${item.image}`}
                    />
                  </div>

                  <div className="flex flex-1 flex-col text-base">
                    <span className="leading-tight">{item.title}</span>
                    {item.title ? (
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {item.title}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex h-16 flex-col justify-between">
                  <Price
                    className="flex justify-end space-y-2 text-right text-sm"
                    amount={`${item.price * item.quantity}`}
                    currencyCode={"USD"}
                  />
                  <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                    <p className="w-6 text-center">
                      <span className="w-full text-sm">{item.quantity}</span>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
        <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
          <p>Taxes</p>
          <Price
            className="text-right text-base text-black dark:text-white"
            amount="0.00"
            currencyCode={"USD"}
          />
        </div>
        <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
          <p>Shipping</p>
          <p className="text-right">Calculated at checkout</p>
        </div>
        <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
          <p>Total</p>
          <Price
            className="text-right text-base text-black dark:text-white"
            amount={totalAmount}
            currencyCode={"USD"}
          />
        </div>
      </div>
      {/* <Link
        href={cart.checkoutUrl}
        className="block w-full rounded-full bg-orange-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100">
        Proceed to Checkout
      </Link> */}
    </div>
  );
};

export default ProductCheckout;
