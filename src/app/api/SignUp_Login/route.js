import { NextResponse } from 'next/server';
import { PrismaClient, UserType } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    //Login
      if(body.login){
        console.log("Attempting login for:", body.email);
        
        const{email, password, rememberMe} = body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const passwordMatch = password === user.password;
        if (!passwordMatch) {
          return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const cookieOptions = {
          path: '/',
          httpOnly: false,
          maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 1, // 30 days or 1 hour
        };
        try {
          const cookieStore = await cookies();
          cookieStore.set('userId', user.id.toString(), cookieOptions);
        } catch (cookieError) {
          console.error("Cookie setting failed:", cookieError);
        }
        return NextResponse.json({ message: 'Login successful' }, { status: 200 });
      }
    //

    const { firstName, lastName, email, password, userType } = body;

  
    // 2. Optional: Email pattern check (if not done on client)
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    // 3. Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered.' }, { status: 409 });
    }

    // 3. Password strength check
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      return NextResponse.json({
        error: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
      }, { status: 400 });
    }

    // 4. Set user type and credits
    const finalUserType = userType === 'PREVILIGED' ? UserType.PREVILIGED : UserType.NORMAL;
    const credits = finalUserType === UserType.PREVILIGED ? 3 : 1;

    // 5. Create the user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password, 
        userType: finalUserType,
        credits,
      },
    });

    // 6. Return success
    return NextResponse.json({ message: 'User created successfully', userId: user.id }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error. Please try again later.' }, { status: 500 });
  }
}
