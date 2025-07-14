import z from "zod";

export const envSchema = z.object({
  DATABASE_URL : z.string().url(),
  PORT : z.coerce.number().default(3333),
  PUBLIC_KEY : z.string(),
  PRIVATE_KEY : z.string()
})

export type Env = z.infer<typeof envSchema>;