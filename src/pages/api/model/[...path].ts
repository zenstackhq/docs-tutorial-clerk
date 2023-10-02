import { getAuth } from "@clerk/nextjs/server";
import { withPresets } from "@zenstackhq/runtime";
import { NextRequestHandler } from "@zenstackhq/server/next";
import type { NextApiRequest } from "next";
import { prisma } from "../../../server/db/client";

async function getPrisma(req: NextApiRequest) {
  const auth = getAuth(req);
  // create a wrapper of Prisma client that enforces access policy,
  // data validation, and @password, @omit behaviors
  return withPresets(prisma, { user: auth ? { id: auth.userId } : undefined });
}

export default NextRequestHandler({ getPrisma });
