"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import LoadingDots from "../loading-dots";
import { useDispatch } from "react-redux";
import { useFormState, useFormStatus } from "react-dom";
import {
  decrementQuantity,
  incrementQuantity,
} from "@/app/(user)/store/slice/cartSlice";
import axios from "axios";
import { API_BASE_URL } from "@/app/(user)/config/constants";

function SubmitButton({ type, dispatch, item, token }) {
  const { pending } = useFormStatus();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "plus") {
      if (token) {
        await axios.post(
          `${API_BASE_URL}update-cart-item/${item.id}`,
          {
            quantity: item.quantity + 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token.tokenId}`,
            },
          }
        );
      } else {
        dispatch(incrementQuantity({ id: item.id }));
      }
    } else {
      if (token) {
        try {
          await axios.post(
            `${API_BASE_URL}update-cart-item/${item.id}`,
            {
              quantity: item.quantity - 1,
            },
            {
              headers: {
                Authorization: `Bearer ${token.tokenId}`,
              },
            }
          );
        } catch (erorr) {
          console.log(erorr);
        }
      } else {
        dispatch(decrementQuantity({ id: item.id }));
      }
    }
  };

  return (
    <button
      type="submit"
      onClick={(e) => {
        if (pending) e.preventDefault();
        handleSubmit(e);
      }}
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      aria-disabled={pending}
      className={clsx(
        " ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
        {
          "cursor-not-allowed": pending,
          "ml-auto": type === "minus",
        }
      )}>
      {pending ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : type === "plus" ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({ item, type, token }) {
  const [message, formAction] = useFormState(item, null);
  const dispatch = useDispatch();

  const payload = {
    lineId: item.id,
    variantId: item.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  };

  const actionWithVariant = formAction.bind(null, payload);

  return (
    <form action={actionWithVariant}>
      <SubmitButton type={type} dispatch={dispatch} item={item} token={token} />
      <p aria-live="polite" className="sr-only" role="status"></p>
    </form>
  );
}
