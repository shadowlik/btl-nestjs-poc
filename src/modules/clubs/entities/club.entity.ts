import { clubs, Prisma } from '@prisma/client';
import { InferSelectModel } from 'drizzle-orm';
import { clubs as drizzleClubs } from 'drizzle/schema';

export class ClubWithPrisma implements clubs {
  id: string;
  benefit_id: string | null;
  cover_id: string | null;
  createdAt: Date;
  creator_id: string | null;
  description: string | null;
  icon_id: string | null;
  is_public: boolean | null;
  name: string | null;
  org_id: string | null;
  program_query_id: string | null;
  settings: Prisma.JsonValue;
  sid: string | null;
  tagline: string | null;
  updatedAt: Date;
}

type DrizzleClubs2 = InferSelectModel<typeof drizzleClubs>;

export class ClubWithDrizzle implements DrizzleClubs2 {
  id: string;
  benefit_id: string | null;
  cover_id: string | null;
  createdAt: string;
  creator_id: string | null;
  description: string | null;
  icon_id: string | null;
  is_public: boolean | null;
  name: string | null;
  org_id: string | null;
  program_query_id: string | null;
  settings: unknown;
  sid: string | null;
  tagline: string | null;
  updatedAt: string;
}
