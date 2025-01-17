import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";


export async function GET(request: NextRequest) {
  try {
    const tokenData = await getTokenData(request);

    if (tokenData) {
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
