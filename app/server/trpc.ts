import { initTRPC } from "@trpc/server";

const trpc = initTRPC.create({ isServer: true });

export const { router, procedure } = trpc;
