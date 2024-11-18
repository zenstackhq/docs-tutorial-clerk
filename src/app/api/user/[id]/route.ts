import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (id) {
    const user = await currentUser();
    if (user) {
      return NextResponse.json({
        id,
        email: user.emailAddresses?.[0]?.emailAddress,
      });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
}
