import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: 'postgresql://btl:btl@localhost:5432/breakthelove',
  },
  verbose: true,
});
