import { z } from "zod";
import { procedure, router } from "./trpc";

const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL || "localhost:5001";

export const appRouter = router({
  getCert: procedure
    .input(z.object({ certid: z.number() }))
    .query(async (req) => {
      const certdata = await fetch(`${backendurl}/fetchcertdata`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ certid: req.input.certid }),
      });
      if (certdata.ok) {
        return certdata.json();
      }
      return null;
    }),
  generateCert: procedure
    .input(z.object({ email: z.string(), digits: z.number() }))
    .mutation(async (req) => {
      if (req.input.email && req.input.digits) {
        const res = await fetch(`${backendurl}/generatepdf`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            digits: req.input.digits,
            mailid: req.input.email,
          }),
        });
        if (res.ok) {
          return await res.json();
        }
      }
      return null;
    }),
  downloadPDF: procedure
    .input(z.object({ certid: z.number() }))
    .query(async (req) => {
      const pdfblob = await fetch(
        `${backendurl}/certifydown/${req.input.certid}`,
        {
          method: "GET",
          mode: "cors",
          redirect: "follow",
          referrerPolicy: "no-referrer",
        }
      ).then((response) => {
        if (response.ok) {
          return fetch(response.url).then((outputfile) => outputfile.blob());
        } else {
          return null;
        }
      });
      return pdfblob;
    }),
});

export type AppRouter = typeof appRouter;
