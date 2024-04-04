import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import axios from "axios";
import { API_BASE_URL } from "@/app/(user)/config/constants";

export async function POST(request, response) {
  try {
    // 1. Retrieve and Parse Request Body
    const reqBody = await request.json();
    const itemId = reqBody.itemId;

    // 4. Extract Authentication Token
    const token = await request.cookies.get("token");

    // 5. Handle Missing or Invalid Token
    if (!token) {
      throw new Error("Authorization token not found.");
    }

    let decoded_token;
    try {
      decoded_token = jwt.verify(token.value, process.env.TOKEN_SECRET);
    } catch (error) {
      throw new Error("Invalid authentication token.");
    }

    // 6. Construct Axios Request
    const res = await axios.post(
      `${API_BASE_URL}remove-cart-item/${itemId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${decoded_token.tokenId}`,
        },
      }
    );

    // 7. Handle API Response (Success)
    if (res.status >= 200 && res.status < 300) {
      // Handle successful API response (e.g., return status, data)
      return NextResponse.json({
        status: res.status,
        code: res.code,
        message: res.message,
      });
    } else {
      throw new Error(`API request failed with status ${res.status}`);
    }
  } catch (error) {
    // 8. Handle Errors Gracefully
    console.error("Error updating cart data:", error);

    const response = NextResponse.json({
      status: error.message || "Internal server error",
      code: 500,
      message: "Failed to update cart data. Please try again later.",
      success: false,
    });
    return response;
  }
}
