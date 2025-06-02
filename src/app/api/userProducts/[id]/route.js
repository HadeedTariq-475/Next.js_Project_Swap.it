import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const productData = await req.json();
    const {
      title,
      description,
      price = 0,
      credits = 0,
      type,
      category,
      exchange = false,
      status = 'ACTIVE',
    } = productData;

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
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

    return NextResponse.json({ success: true, product: updatedProduct }, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
