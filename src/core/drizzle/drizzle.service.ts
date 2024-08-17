import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client } from 'pg';
import * as schema from '../../../drizzle/schema';
import { drizzle } from 'drizzle-orm/node-postgres';

export const drizzleClient = drizzle(
  new Client({
    connectionString: process.env.DATABASE_URL,
  }),
  { schema: schema },
);

@Injectable()
export class DrizzleService implements OnModuleInit {
  private logger = new Logger(DrizzleService.name);
  drizzle = drizzleClient;
  schemas = schema;
  constructor() {}

  async onModuleInit() {
    this.logger.log('[DRIZZLE]: Connected to database');
  }

  query = this.drizzle.query;
  select = this.drizzle.select;
  insert = this.drizzle.insert;
  update = this.drizzle.update;
  delete = this.drizzle.delete;
  transaction = this.drizzle.transaction;
  selectDistinct = this.drizzle.selectDistinct;
  selectDistinctOn = this.drizzle.selectDistinctOn;
  execute = this.drizzle.execute;
}
