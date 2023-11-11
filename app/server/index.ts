import { z } from "zod";
import { procedure, router } from "./trpc";

const dataArray = [
  {
    certid: 432121,
    name: "Raj Saroj",
    phone: "9967586822",
    email: "raj.saroj@example.com",
  },
  {
    certid: 432122,
    name: "John Doe",
    phone: "9876543210",
    email: "john.doe@example.com",
  },
  {
    certid: 432123,
    name: "Alice Smith",
    phone: "8765432109",
    email: "alice.smith@example.com",
  },
  {
    certid: 432124,
    name: "Bob Johnson",
    phone: "7654321098",
    email: "bob.johnson@example.com",
  },
  {
    certid: 432125,
    name: "Emily Davis",
    phone: "6543210987",
    email: "emily.davis@example.com",
  },
  {
    certid: 432126,
    name: "David Brown",
    phone: "5432109876",
    email: "david.brown@example.com",
  },
  {
    certid: 432127,
    name: "Sara White",
    phone: "4321098765",
    email: "sara.white@example.com",
  },
  {
    certid: 432128,
    name: "Alex Wilson",
    phone: "3210987654",
    email: "alex.wilson@example.com",
  },
  {
    certid: 432129,
    name: "Grace Miller",
    phone: "2109876543",
    email: "grace.miller@example.com",
  },
  {
    certid: 432130,
    name: "Samuel Turner",
    phone: "1098765432",
    email: "samuel.turner@example.com",
  },
];

export const appRouter = router({
  getCert: procedure.input(z.object({ certid: z.number() })).query((req) => {
    return dataArray.find((data) => data.certid == req.input.certid);
  }),
  generateCert: procedure
    .input(z.object({ email: z.string(), digits: z.number() }))
    .query((req) => {
      if (req.input.email && req.input.digits) {
        const available = dataArray.find(
          (data) =>
            data.email == req.input.email &&
            parseInt(data.phone.slice(-4)) == req.input.digits
        );
        if (available) {
          return available;
        } else {
          return null;
        }
      }
    }),
});

export type AppRouter = typeof appRouter;
