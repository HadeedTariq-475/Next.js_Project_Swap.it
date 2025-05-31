import { NextResponse } from 'next/server';
import { PrismaClient, UserType } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(id) {

    try{
        const user =  await parseInt(prisma.user.findUnique({ where : {id}}))
        
        if(!user){
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        else{
            return NextResponse.json({user})
        }
    }   
    catch(err){
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
    
    
}