import { NextRequest,NextResponse } from "next/server";
import User from "@/models/UserModel";

export async function GET(){
    const users = await User.find()
}