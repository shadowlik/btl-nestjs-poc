import z from 'zod';

const config = z
  .object({
    NODE_ENV: z
      .enum(['development', 'production', 'staging', 'test'])
      .default('development'),
    PORT: z.coerce.number().default(3322),
    DATABASE_URL: z.string().min(1),
  })
  .required();

const validate = () => config.parse(process.env);

export type ConfigSchema = z.infer<typeof config>;

export { validate };
