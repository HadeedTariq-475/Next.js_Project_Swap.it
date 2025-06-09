import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { userID, productId } = await req.json();

  try {
    await prisma.wishlist.create({
      data: {
        userId: parseInt(userID),
        productId: parseInt(productId),
      },
    });

    return NextResponse.json({ message: 'Added to wishlist' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  const { userID, productId } = await req.json();

  try {
    await prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId: parseInt(userID),
          productId: parseInt(productId),
        },
      },
    });

    return NextResponse.json({ message: 'Removed from wishlist' });
  } catch (error) {
    return NextResponse.json({ error: 'Not found in wishlist' }, { status: 404 });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = parseInt(searchParams.get('userId') || '');
  const productId = parseInt(searchParams.get('productId') || '');

  try {
    const entry = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    return NextResponse.json({ isWishlisted: !!entry });
  } catch {
    return NextResponse.json({ isWishlisted: false });
  }
}