import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";

interface TokenData {
  name: string;
  message: string;
}

export async function GET(request: NextRequest) {
  try {
    const tokenData = await getTokenData(request) as TokenData;

    if (tokenData.name!== "JsonWebTokenError") {
      return NextResponse.json(
        { message: "token found", tokenData },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "unable to verify token" });
    }
  } catch (error) {
    return NextResponse.json({ error: error }); 
  }
}
