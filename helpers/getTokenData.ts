import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function getTokenData(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const tokenData = jwt.verify(token, process.env.SECRET_KEY!);
    return tokenData;
  } catch (error: any) {
    return null;
  }
}