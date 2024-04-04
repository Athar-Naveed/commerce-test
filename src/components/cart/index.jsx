"use client";
import CartModal from "./modal";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addInitialCartItems } from "@/app/(user)/store/slice/cartSlice";
import { API_BASE_URL } from "@/app/(user)/config/constants";
import axios from "axios";

export default function Cart() {
  const cartProducts = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const [isToken, setIsToken] = useState();
  const [token, setToken] = useState(null);

  const dispatch = useDispatch();
  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartFromLocalStorage = localStorage.getItem("cart");
      const parsedCart = cartFromLocalStorage
        ? JSON.parse(cartFromLocalStorage)
        : [];

      const fetchCartItems = async () => {
        const response = await axios.get("/api/users/show-cart-items");
        setCartItems(response.data.Items);
        setIsToken(response.data.token);
      };

      fetchCartItems();
      dispatch(addInitialCartItems(parsedCart));
    }

    setIsCartLoading(false);
  }, [dispatch]);

  let cart;
  if (isToken && cartItems) {
    cart = cartItems;
  } else {
    cart = cartProducts;
  }

  return (
    <div className="">
      <CartModal cart={cart} />
    </div>
  );
}
