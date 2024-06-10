import { clerkClient } from "@clerk/nextjs/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (id) {
    const user = await clerkClient.users.getUser(id);
    if (user) {
      return Response.json({
        id,
        email: user.emailAddresses?.[0]?.emailAddress,
      });
    } else {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
  } else {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }
}
