import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const verifyApiAccess = async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      console.log("No token found or token invalid");
      return NextResponse.json(
        { error: "You do not have permission to access" },
        { status: 401 } 
      );
    }
    
    return token;
  } catch (error) {
    console.error("Error verifying API access:", error);
    return NextResponse.json(
      { error: "Failed to verify access. Please try again later." },
      { status: 500 }
    );
  }
};

export default verifyApiAccess;
