import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all products with images included
    const products = await prisma.product.findMany({
      include: {
        images: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    // Map images array to array of URLs only
    const formattedProducts = products.map(product => ({
      ...product,
      images: product.images
        .map(img => img.url)
        .filter(url => url && url.trim() !== ''),
    }));

    // Shuffle products and pick 16 random ones
    const shuffled = formattedProducts.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 16);

    return NextResponse.json(selected);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json({ error: 'Failed to load featured products' }, { status: 500 });
  }
}
