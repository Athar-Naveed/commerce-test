import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import axios from "axios";
import { API_BASE_URL } from "@/app/(user)/config/constants";

export async function POST(request, response) {
  try {
    // 1. Retrieve and Parse Request Body
    const reqBody = await request.json();

    const {
      Contact,
      firstname,
      lastname,
      address,
      country,
      city,
      state,
      zip_code,
      phone,
      address_lable,
      Payment_method,
    } = reqBody;

    const data = {
      Contact,
      firstname,
      lastname,
      address,
      country,
      city,
      state,
      zip_code,
      phone,
      address_lable,
      Payment_method,
    };

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
    const res = await axios.post(`${API_BASE_URL}checkout`, data, {
      headers: {
        Authorization: `Bearer ${decoded_token}`,
      },
    });
    console.log("checkout res:", res);
    // 7. Handle API Response (Success)
    if (res.status >= 200 && res.status < 300) {
      // Handle successful API response (e.g., return status, data)
      console.log("Checkout successfully:", res.data); // Log for debugging or analytics
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
