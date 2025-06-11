import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { buyer_id, seller_id, notification_type, productId } = body;

    // Basic validation
    if (!buyer_id || !seller_id || !notification_type || !productId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create notification
    const notification = await prisma.notification.create({
      data: {
        type: notification_type,
        fromUserId: buyer_id,
        toUserId: seller_id,
        productId: productId,
      },
    });

    // Optional: Emit real-time event with socket.io
    global.io?.to(`user_${seller_id}`).emit('new_notification', notification);

    return NextResponse.json({ success: true, notification }, { status: 200 });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const seller_id = searchParams.get("seller_id");

  if (!seller_id) return NextResponse.json([], { status: 200 });

  const notifications = await prisma.notification.findMany({
    where: { sellerId: seller_id },
    orderBy: { createdAt: 'desc' },
    include: {
      fromUser: true,
    },
  });

  return NextResponse.json(notifications);
}