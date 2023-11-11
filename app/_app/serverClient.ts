import { appRouter } from "@/app/server";
import { httpBatchLink } from "@trpc/client";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_CERTIFY_URL}/api/trpc`,
    }),
  ],
});
