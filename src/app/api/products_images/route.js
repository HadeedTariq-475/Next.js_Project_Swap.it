// /api/userProducts/images.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { productId, images } = await req.json();

    if (!productId || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
    }

    const imageRecords = images.map(url => ({
      url,
      productId,
    }));

    await prisma.productImage.createMany({ data: imageRecords });

    return NextResponse.json({ success: true, message: "Images saved successfully" }, { status: 201 });
  } catch (error) {
    console.error('Error saving images:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
