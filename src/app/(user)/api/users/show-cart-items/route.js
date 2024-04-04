import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";
import { API_BASE_URL } from "@/app/(user)/config/constants";

export async function GET(request, response) {
  const token = await request.cookies.get("token");

  if (!token) {
    return NextResponse.json({
      status: "Authorization token not found.",
      code: 500,
      message: "Failed to fetch cart data.",
      success: true,
    });
  }

  let decoded_token;
  try {
    decoded_token = jwt.verify(token.value, process.env.TOKEN_SECRET);
  } catch (error) {
    return NextResponse.json({
      status: "Invalid authentication token.",
      code: 500,
      message: "Failed to fetch cart data.",
      success: true,
    });
  }

  const dataFetch = async () => {
    const res = await axios.get(
      "https://tecjaunt.store/ecommerce-backend/api/show-cart",
      {
        headers: {
          Authorization: `Bearer ${decoded_token.tokenId}`,
        },
      }
    );
     return res.data.data.cart_items.map((item) => ({
       id: item.id,
       price: item.product.price,
       quantity: item.quantity,
       title: item.product.name,
       image: item.product.first_image,
     }));
  };

  try {
    const cartItems = await dataFetch();
    if (!cartItems) {
      return NextResponse.json({
        status: "Missing cart items in API response.",
        code: 500,
        message: "Failed to fetch cart data.",
        success: true,
      });
    }
    return NextResponse.json({
      token: decoded_token.tokenId,
      Items: cartItems,
    });
  } catch (error) {
    return NextResponse.json({
      status: `API request failed with status ${error.response.status}`,
      code: 500,
      message: "Failed to fetch cart data.",
      success: true,
    });
  }
}
