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

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');

    if (!id || !type) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    let products = [];

    if (type === "BUY") {
      products = await prisma.product.findMany({
        where: {
          ownerId: parseInt(id),
          type: "BUY",
          status: "ACTIVE"
        },
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          credits: true,
          type: true,
          exchange: true,
          images: {
            select: {
              url: true
            }
          }
        }
      });
    } else if (type === "DONATE") {
      products = await prisma.product.findMany({
        where: {
          ownerId: parseInt(id),
          type: "DONATE",
          status: "ACTIVE"
        },
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          credits: true,
          type: true,
          exchange: true,
          images: {
            select: {
              url: true
            }
          }
        }
      });
    } else {
      return NextResponse.json({ error: 'Invalid product type' }, { status: 400 });
    }

    return NextResponse.json(products, { status: 200 });

  } catch (error) {
    console.error('Error fetching products:', error);
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

    const existingProduct = await prisma.product.findUnique({
      where: { id: parsedId },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Delete related product images first
    await prisma.productImage.deleteMany({
      where: { productId: parsedId },
    });

    // Then delete the product itself
    await prisma.product.delete({
      where: { id: parsedId },
    });

    return NextResponse.json({ success: true, message: 'Product deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting product:', error.message);
    console.error(error.stack);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}


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
