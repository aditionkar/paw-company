import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const token = req.cookies.get("token");

    if (!token) {
      return NextResponse.json({ isLoggedIn: false });
    }

    // Add token verification logic here if needed (e.g., JWT verification)
    // const isValid = verifyToken(token);
    // if (!isValid) return NextResponse.json({ isLoggedIn: false });

    return NextResponse.json({ isLoggedIn: true });
  } catch (error) {
    return NextResponse.json(
      { isLoggedIn: false, error: error.message },
      { status: 500 }
    );
  }
}
 
 