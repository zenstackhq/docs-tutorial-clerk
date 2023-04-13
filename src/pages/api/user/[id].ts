import { clerkClient } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string | undefined;
  if (id) {
    const user = await clerkClient.users.getUser(id);
    if (user) {
      return res
        .status(200)
        .json({ id, email: user.emailAddresses?.[0]?.emailAddress });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } else {
    return res.status(400).json({ error: "Missing id" });
  }
}
