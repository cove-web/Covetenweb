import { createUser } from "@/firebase/createFirebaseUser";
import { NextRequest, NextResponse } from "next/server"
import {v4 as uuid} from 'uuid'





export async function POST(request: Request){
    try{

        const {email, password} = await request.json()
        const uid = uuid();

const user = await createUser(uid, email, password)

if(user.email){

  return NextResponse.json({"message": "Account created successfully"}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
})
}
       
    }
    catch(e){
        return NextResponse.json({message: 'Something Went Wrong '}, {status: 500})
    }
}


export async function OPTIONS(request: Request) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
    return new Response(null, {
      status: 204,
      headers:corsHeaders
    });
  }