import { NextRequest,NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email} = reqBody;

        if(!email){
            return NextResponse.json({message: 'Email is required'},{status: 400})
        }
        await sendEmail({email,emailType:'RESET'})
        return NextResponse.json({message:"Success email sent"},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Error sending email'},{status:500})
    }
}