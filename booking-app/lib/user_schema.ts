import z, { email } from "zod";

const schema = z.object({
  email: z.string().trim().pipe(z.email()),
  password: z.string().min(5),
});

export { schema };
