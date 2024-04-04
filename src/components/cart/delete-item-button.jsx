"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import LoadingDots from "@/components/loading-dots";
import { useDispatch } from "react-redux";
import { remove } from "@/app/(user)/store/slice/cartSlice";
import axios from "axios";



  function DeleteItemButton({ item,token }) {
    const dispatch = useDispatch();
    
  const removeItem = async(item) => {
   if (token) {
      const response = await axios.post(`/api/users/remove-item`, {
        itemId: item.id,
      });
    } else {
      dispatch(remove({ id: item.id }));
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {" "}
      <button
        type="button"
        onClick={() => removeItem(item)}
        aria-label="Remove cart item"
        className={clsx(
          "ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200",
          {
            "cursor-not-allowed px-0": false,
          }
        )}>
        <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
      </button>
    </form>
  );
}

export default DeleteItemButton;
