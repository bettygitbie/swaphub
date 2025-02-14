import { NextResponse } from "next/server";
import User from "@/models/UserModel";

export async function GET(){
    const users = await User.find();
    return NextResponse.json({message:"users found",users},{status:200})
}