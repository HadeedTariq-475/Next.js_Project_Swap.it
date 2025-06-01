// /api/userProducts/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    
    const productData = await req.json();
    const {
      ownerId,
      title,
      description,
      price = 0,
      credits = 0,
      type,
      category,
      exchange = false,
      status = 'ACTIVE',
    } = productData;

    const product = await prisma.product.create({
      data: {
        owner: { connect: { id: ownerId } },
        title,
        description,
        price,
        credits,
        type,
        category,
        exchange,
        status,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
