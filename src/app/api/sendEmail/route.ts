
import { sendEmail } from "@/shared/email";
import { NextRequest, NextResponse } from "next/server"

interface EmailRequestBody {
  to: string;
  subject: string;
  html: string;
}
export async function POST(request: Request){
    try{
        const { to, subject, html }: EmailRequestBody = await request.json()

        console.log({ to, subject, html })
        console.log('i am here')

        await sendEmail({ to, subject, html });

        return NextResponse.json({message: "Email sent successfully"}, {status: 200})

       
    }
    catch(e){
        return NextResponse.json({message: 'Something Went Wrong '}, {status: 500})
    }
}