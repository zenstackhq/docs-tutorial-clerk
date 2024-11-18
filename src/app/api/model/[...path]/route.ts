import { auth } from "@clerk/nextjs/server";
import { enhance } from "@zenstackhq/runtime";
import { NextRequestHandler } from "@zenstackhq/server/next";
import { prisma } from "~/server/db/client";

async function getPrisma() {
  const authObject = await auth();
  // create a wrapper of Prisma client that enforces access policy
  return enhance(prisma, {
    user: authObject.userId ? { id: authObject.userId } : undefined,
  });
}

const handler = NextRequestHandler({ getPrisma, useAppDir: true });

export {
  handler as DELETE,
  handler as GET,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};
