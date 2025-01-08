import { connectToDatabase } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import User from '@/models/UserModel';

connectToDatabase();

export async function POST(request: NextRequest){
    try {
        const {username, email, password} = await request.json();
        console.log(username)
        //check if user exists
        const user = await User.findOne({email});
        console.log(user)
        if(user){
            return NextResponse.json({message: "User already exists"}, {status: 400});
        }
        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        return NextResponse.json({message: "User created", savedUser}, {status: 201});
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500});
        
    }
}