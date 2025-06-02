import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET(request, context) {
  const { params } = context;
  const prisma = new PrismaClient();
  const id = parseInt(params.id);

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include:{
        images: true ,
        owner: true
      } 
      
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const filteredProduct = {
      ...product,
      images: product.images
        .map(img => img.url)
        .filter(url => url && url.trim() !== ''),
    };

    return NextResponse.json(filteredProduct);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
