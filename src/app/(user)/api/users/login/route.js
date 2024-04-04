import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import axios from "axios";
import { API_BASE_URL } from "@/app/(user)/config/constants";

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const res = await axios.post(`${API_BASE_URL}login-customer`, {
      email: email,
      password: password,
    });

    if (res.data.code == 200) {
      const apiToken = res.data.token;
    

      if (!apiToken) {
        throw new Error("Missing API token in response");
      }

      const token = jwt.sign(
        { tokenId: apiToken, email: email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      const response = NextResponse.json({
        status: res.data.status,
        code: res.data.code,
        token: apiToken,
        message: "Login Successfully",
        success: true,
      });
      response.cookies.set("token", token, {
        httpOnly: true,
      });
      return response;
    } else if (res.data.code == 422) {
      const response = NextResponse.json({
        status: res.data.status,
        code: res.data.code,
        message: res.data.message,
        error: true,
      });

      return response;
    }
  } catch (error) {
    const response = NextResponse.json({
      status: error,
      code: 500,
      message: "Server Failed",
      success: true,
    });
    return response;
  }
}
