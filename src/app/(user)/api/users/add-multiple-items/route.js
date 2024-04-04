import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import axios from "axios";
import { API_BASE_URL } from "@/app/(user)/config/constants";

export async function POST(request, response) {
  try {
    // 1. Retrieve and Parse Request Body
    const reqBody = await request.json();

   

    // 3. Format Request Data
    const formattedReqBody = reqBody.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

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
    const res = await axios.post(`${API_BASE_URL}cart-data`, { cart: formattedReqBody }, {
      headers: {
        Authorization: `Bearer ${decoded_token.tokenId}`,
      },
    });

    // 7. Handle API Response (Success)
    if (res.status >= 200 && res.status < 300) {
      // Handle successful API response (e.g., return status, data)
      // ... your logic here based on the API response (if needed)
      return NextResponse.json({ message: "Cart data updated successfully." });
    } else {
      throw new Error(`API request failed with status ${res.status}`);
    }
  } catch (error) {
    // 8. Handle Errors Gracefully
    console.error("Error updating cart data:", error); // Log for debugging

    const response = NextResponse.json({
      status: error.message || "Internal server error",
      code: 500, // Or appropriate error code
      message: "Failed to update cart data. Please try again later.", // User-friendly error message
      success: false,
    });
    return response;
  }
}
