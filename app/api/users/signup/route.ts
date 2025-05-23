import { connectToDatabase } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import User from '@/models/UserModel';

connectToDatabase();

export async function POST(request: NextRequest){
    try {
        const {username, email, password} = await request.json();
       
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({message: "User already exists"}, {status: 400});
        }
     
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        return NextResponse.json({message: "User created", savedUser}, {status: 200});
        
    } catch (error) {
        return NextResponse.json({message: "Error creating user",error},{status: 500});
        
    }
}