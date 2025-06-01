import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);   // extract query params from the request URL
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User ID not provided' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },  // ensure it's a number if your ID is Int in Prisma
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        profilePic: true,
        country: true,
        phone : true,
        city: true,
        address1: true,
        address2: true,
        credits: true,
        userType: true,
        createdAt: true,
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const {
      id,
      firstName,
      lastName,
      email,
      profilePic,
      country,
      city,
      phone,
      address1,
      address2,
      credits,
      userType,
    } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        email,
        profilePic,
        country,
        city,
        phone,
        address1,
        address2,
        credits,
        userType,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });

  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
