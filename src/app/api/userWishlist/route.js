import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const wishlistItems = await prisma.wishlist.findMany({
        where: {
            userId: parseInt(id),
            product: {
            status: 'ACTIVE',
            },
        },
        include: {
            product: {
            include: {
                images: true,
            },
            },
        },
        });

        return NextResponse.json(wishlistItems, { status: 200 });

  } catch (error) {
    console.error('Error fetching wishlistItems:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('ID');
    console.log('Received ID for deletion:', id);

    if (!id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
    }

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const existingProduct = await prisma.wishlist.findUnique({
      where: { id: parsedId },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }


    // Then delete the product itself
    await prisma.wishlist.delete({
      where: { id: parsedId },
    });

    return NextResponse.json({ success: true, message: 'Product deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting product:', error.message);
    console.error(error.stack);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

