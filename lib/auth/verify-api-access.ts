import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const verifyApiAccess = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json(
      { error: "Not have permission to access" },
      { status: 500 }
    );
  }
  return token
};

export default verifyApiAccess
