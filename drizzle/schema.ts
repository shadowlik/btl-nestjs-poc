import {
  pgTable,
  uniqueIndex,
  foreignKey,
  uuid,
  timestamp,
  varchar,
  boolean,
  index,
  text,
  integer,
  jsonb,
  type AnyPgColumn,
  unique,
  numeric,
  date,
  time,
  doublePrecision,
  json,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const beneficiary_group_verification_emails = pgTable(
  'beneficiary_group_verification_emails',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    type: varchar('type', { length: 255 }).notNull(),
    allowed: boolean('allowed').notNull(),
    value: varchar('value', { length: 255 }).notNull(),
    beneficiary_group_id: uuid('beneficiary_group_id').references(
      () => beneficiary_groups.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
  },
  (table) => {
    return {
      beneficiary_group_id_type: uniqueIndex(
        'beneficiary_group_verification_emails_beneficiary_group_id_type',
      ).using('btree', table.beneficiary_group_id, table.type, table.value),
    };
  },
);

export const benefit_bookings = pgTable(
  'benefit_bookings',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    benefit_id: uuid('benefit_id').references(() => benefits.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    beneficiary_group_id: uuid('beneficiary_group_id').references(
      () => beneficiary_groups.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
    beneficiary_id: uuid('beneficiary_id').references(() => beneficiaries.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    program_booking_id: uuid('program_booking_id').references(
      () => program_bookings.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
    notes: text('notes'),
  },
  (table) => {
    return {
      beneficiary_group_id: index(
        'benefit_bookings_beneficiary_group_id',
      ).using('btree', table.beneficiary_group_id),
      beneficiary_id: index('benefit_bookings_beneficiary_id').using(
        'btree',
        table.beneficiary_id,
      ),
      benefit_id: index('benefit_bookings_benefit_id').using(
        'btree',
        table.benefit_id,
      ),
      program_booking_id: index('benefit_bookings_program_booking_id').using(
        'btree',
        table.program_booking_id,
      ),
    };
  },
);

export const SequelizeMeta = pgTable('SequelizeMeta', {
  name: varchar('name', { length: 255 }).primaryKey().notNull(),
});

export const attributes = pgTable(
  'attributes',
  {
    id: uuid('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    type: text('type'),
  },
  (table) => {
    return {
      type: index('attributes_type').using('btree', table.type),
    };
  },
);

export const beneficiaries = pgTable(
  'beneficiaries',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    benefit_id: uuid('benefit_id').references(() => benefits.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    customer_id: uuid('customer_id').references(() => customers.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    status: varchar('status', { length: 255 })
      .default("'OK'::character varying")
      .notNull(),
  },
  (table) => {
    return {
      benefit_id_customer_id: uniqueIndex(
        'beneficiaries_benefit_id_customer_id',
      ).using('btree', table.benefit_id, table.customer_id),
      customer_id: index('beneficiaries_customer_id').using(
        'btree',
        table.customer_id,
      ),
    };
  },
);

export const beneficiary_group_exclusive_blocks = pgTable(
  'beneficiary_group_exclusive_blocks',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    beneficiary_group_id: uuid('beneficiary_group_id').references(
      () => beneficiary_groups.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    benefit_block_id: uuid('benefit_block_id').references(
      () => benefit_blocks.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
  },
  (table) => {
    return {
      beneficiary_group_id_benefit: uniqueIndex(
        'beneficiary_group_exclusive_blocks_beneficiary_group_id_benefit',
      ).using('btree', table.beneficiary_group_id, table.benefit_block_id),
    };
  },
);

export const beneficiary_group_exclusive_programs = pgTable(
  'beneficiary_group_exclusive_programs',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    beneficiary_group_id: uuid('beneficiary_group_id').references(
      () => beneficiary_groups.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    benefit_program_id: uuid('benefit_program_id').references(
      () => benefit_programs.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
  },
  (table) => {
    return {
      beneficiary_group_id_benef: uniqueIndex(
        'beneficiary_group_exclusive_programs_beneficiary_group_id_benef',
      ).using('btree', table.beneficiary_group_id, table.benefit_program_id),
    };
  },
);

export const benefit_faqs = pgTable(
  'benefit_faqs',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    benefit_id: uuid('benefit_id').references(() => benefits.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    name: varchar('name', { length: 255 }),
    description: text('description'),
    order: integer('order'),
  },
  (table) => {
    return {
      benefit_id: index('benefit_faqs_benefit_id').using(
        'btree',
        table.benefit_id,
      ),
    };
  },
);

export const addresses = pgTable('addresses', {
  id: uuid('id').primaryKey().notNull(),
  country: varchar('country', { length: 255 }),
  line_1: text('line_1'),
  line_2: text('line_2'),
  city: varchar('city', { length: 255 }),
  state: varchar('state', { length: 255 }),
  postcode: varchar('postcode', { length: 255 }),
  lat: varchar('lat', { length: 255 }),
  lon: varchar('lon', { length: 255 }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  url: text('url'),
});

export const beneficiary_group_users = pgTable(
  'beneficiary_group_users',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    beneficiary_group_id: uuid('beneficiary_group_id').references(
      () => beneficiary_groups.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    beneficiary_id: uuid('beneficiary_id').references(() => beneficiaries.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    verification_info: jsonb('verification_info'),
  },
  (table) => {
    return {
      beneficiary_group_id_beneficiary_id: uniqueIndex(
        'beneficiary_group_users_beneficiary_group_id_beneficiary_id',
      ).using('btree', table.beneficiary_group_id, table.beneficiary_id),
      beneficiary_id: index('beneficiary_group_users_beneficiary_id').using(
        'btree',
        table.beneficiary_id,
      ),
    };
  },
);

export const assets = pgTable(
  'assets',
  {
    id: uuid('id').primaryKey().notNull(),
    key: text('key'),
    filename: text('filename'),
    extension: text('extension'),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    creator_id: uuid('creator_id').references((): AnyPgColumn => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      assets_key_filename: unique('assets_key_filename').on(
        table.key,
        table.filename,
      ),
    };
  },
);

export const attribute_values = pgTable(
  'attribute_values',
  {
    id: uuid('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    attribute_id: uuid('attribute_id').references(() => attributes.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    order: integer('order'),
  },
  (table) => {
    return {
      attribute_id: index('attribute_values_attribute_id').using(
        'btree',
        table.attribute_id,
      ),
    };
  },
);

export const beneficiary_groups = pgTable(
  'beneficiary_groups',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    benefit_id: uuid('benefit_id').references(() => benefits.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    name: varchar('name', { length: 255 }),
    description: text('description'),
    status: varchar('status', { length: 255 }),
    verification_method: varchar('verification_method', { length: 255 }),
    verification_name: varchar('verification_name', { length: 255 }),
    verification_description: varchar('verification_description', {
      length: 255,
    }),
    verification_settings: jsonb('verification_settings'),
    base_discount_percent: numeric('base_discount_percent'),
    base_discount_cents: numeric('base_discount_cents'),
    verification_fallback_message: text('verification_fallback_message'),
  },
  (table) => {
    return {
      benefit_id: index('beneficiary_groups_benefit_id').using(
        'btree',
        table.benefit_id,
      ),
    };
  },
);

export const beneficiary_group_caps = pgTable(
  'beneficiary_group_caps',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    beneficiary_group_id: uuid('beneficiary_group_id').references(
      () => beneficiary_groups.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    cap_id: uuid('cap_id').references(() => caps.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      beneficiary_group_id: index(
        'beneficiary_group_caps_beneficiary_group_id',
      ).using('btree', table.beneficiary_group_id),
    };
  },
);

export const benefit_blocks = pgTable(
  'benefit_blocks',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    benefit_venue_id: uuid('benefit_venue_id').references(
      () => benefit_venues.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    resource_id: uuid('resource_id').references(() => resources.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    notes: text('notes'),
    date_start: date('date_start'),
    date_end: date('date_end'),
    wall_start: time('wall_start'),
    wall_end: time('wall_end'),
    pricing_type: text('pricing_type'),
    benefactor_hourly_cost_cents: numeric('benefactor_hourly_cost_cents'),
    benefit_exclusive: boolean('benefit_exclusive'),
  },
  (table) => {
    return {
      benefit_venue_id: index('benefit_blocks_benefit_venue_id').using(
        'btree',
        table.benefit_venue_id,
      ),
      resource_id: index('benefit_blocks_resource_id').using(
        'btree',
        table.resource_id,
      ),
    };
  },
);

export const benefit_programs = pgTable(
  'benefit_programs',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    benefit_id: uuid('benefit_id').references(() => benefits.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    program_id: uuid('program_id').references(() => programs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    checkin_instructions: text('checkin_instructions'),
  },
  (table) => {
    return {
      benefit_id_program_id: uniqueIndex(
        'benefit_programs_benefit_id_program_id',
      ).using('btree', table.benefit_id, table.program_id),
    };
  },
);

export const benefit_venue_faqs = pgTable(
  'benefit_venue_faqs',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    benefit_venue_id: uuid('benefit_venue_id').references(
      () => benefit_venues.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    name: text('name'),
    description: text('description'),
    order: integer('order'),
  },
  (table) => {
    return {
      benefit_venue_id: index('benefit_venue_faqs_benefit_venue_id').using(
        'btree',
        table.benefit_venue_id,
      ),
    };
  },
);

export const benefit_venues = pgTable(
  'benefit_venues',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    benefit_id: uuid('benefit_id').references(() => benefits.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    venue_id: uuid('venue_id').references(() => venues.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    status: varchar('status', { length: 255 }),
    checkin_instructions: text('checkin_instructions'),
    visible_reservation_days: integer('visible_reservation_days'),
    description: text('description'),
    faq_section_title: text('faq_section_title'),
    settings: jsonb('settings'),
  },
  (table) => {
    return {
      benefit_id_venue_id: uniqueIndex(
        'benefit_venues_benefit_id_venue_id',
      ).using('btree', table.benefit_id, table.venue_id),
    };
  },
);

export const benefits = pgTable(
  'benefits',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    sid: varchar('sid', { length: 255 }).notNull(),
    creator_id: uuid('creator_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    org_id: uuid('org_id').references(() => orgs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    name: text('name').notNull(),
    description: text('description'),
    status: text('status'),
    date_start: date('date_start'),
    date_end: date('date_end'),
    wall_start: time('wall_start'),
    wall_end: time('wall_end'),
    tz: text('tz'),
    color: text('color'),
    settings: jsonb('settings'),
  },
  (table) => {
    return {
      org_id: index('benefits_org_id').using('btree', table.org_id),
      sid: uniqueIndex('benefits_sid').using('btree', table.sid),
    };
  },
);

export const benefit_venue_permitted_beneficiary_groups = pgTable(
  'benefit_venue_permitted_beneficiary_groups',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    beneficiary_group_id: uuid('beneficiary_group_id').references(
      () => beneficiary_groups.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    benefit_venue_id: uuid('benefit_venue_id').references(
      () => benefit_venues.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
  },
  (table) => {
    return {
      benefit_venue_id: index(
        'benefit_venue_permitted_beneficiary_groups_benefit_venue_id',
      ).using('btree', table.benefit_venue_id),
    };
  },
);

export const benefit_venue_permitted_resources = pgTable(
  'benefit_venue_permitted_resources',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    resource_id: uuid('resource_id').references(() => resources.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    benefit_venue_id: uuid('benefit_venue_id').references(
      () => benefit_venues.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
  },
  (table) => {
    return {
      benefit_venue_id: index(
        'benefit_venue_permitted_resources_benefit_venue_id',
      ).using('btree', table.benefit_venue_id),
    };
  },
);

export const benefit_venue_tags = pgTable(
  'benefit_venue_tags',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    creator_id: uuid('creator_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    benefit_venue_id: uuid('benefit_venue_id').references(
      () => benefit_venues.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    tag_id: uuid('tag_id').references(() => org_tags.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      benefit_venue_id_tag_id: uniqueIndex(
        'benefit_venue_tags_benefit_venue_id_tag_id',
      ).using('btree', table.benefit_venue_id, table.tag_id),
    };
  },
);

export const blocked_users = pgTable(
  'blocked_users',
  {
    id: uuid('id').primaryKey().notNull(),
    user_id: uuid('user_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    blocked_user_id: uuid('blocked_user_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      user_id_blocked_user_id: uniqueIndex(
        'blocked_users_user_id_blocked_user_id',
      ).using('btree', table.user_id, table.blocked_user_id),
    };
  },
);

export const btl_featured_facilities = pgTable('btl_featured_facilities', {
  id: uuid('id').primaryKey().notNull(),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  title: text('title'),
  org_id: uuid('org_id').references(() => orgs.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  venue_id: uuid('venue_id').references(() => venues.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  url: text('url'),
  sport: text('sport'),
  order: integer('order'),
});

export const btl_featured_geos = pgTable('btl_featured_geos', {
  id: uuid('id').primaryKey().notNull(),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  title: text('title'),
  country: text('country'),
  state: text('state'),
  city: text('city'),
  image_id: uuid('image_id').references(() => assets.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  order: integer('order'),
});

export const btl_org = pgTable(
  'btl_org',
  {
    org_id: uuid('org_id')
      .notNull()
      .references(() => orgs.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    single_row: boolean('single_row').default(true),
  },
  (table) => {
    return {
      btl_org_single_row_key: unique('btl_org_single_row_key').on(
        table.single_row,
      ),
    };
  },
);

export const club_attribute_settings = pgTable(
  'club_attribute_settings',
  {
    id: uuid('id').primaryKey().notNull(),
    attribute_id: uuid('attribute_id').references(() => attributes.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    web_filterable: boolean('web_filterable').default(false),
    app_filterable: boolean('app_filterable').default(false),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      attribute_id: index('club_attribute_settings_attribute_id').using(
        'btree',
        table.attribute_id,
      ),
    };
  },
);

export const comments = pgTable(
  'comments',
  {
    id: uuid('id').primaryKey().notNull(),
    post_id: uuid('post_id').references(() => posts.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    parent_comment_id: uuid('parent_comment_id'),
    thread_id: uuid('thread_id'),
    comment: text('comment'),
    deleted: boolean('deleted').default(false),
    is_admin_comment: boolean('is_admin_comment').default(false),
    creator_id: uuid('creator_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      created_at: index('comments_created_at').using('btree', table.createdAt),
      creator_id: index('comments_creator_id').using('btree', table.creator_id),
      parent_comment_id: index('comments_parent_comment_id').using(
        'btree',
        table.parent_comment_id,
      ),
      post_id: index('comments_post_id').using('btree', table.post_id),
      thread_id: index('comments_thread_id').using('btree', table.thread_id),
      comments_parent_comment_id_fkey: foreignKey({
        columns: [table.parent_comment_id],
        foreignColumns: [table.id],
        name: 'comments_parent_comment_id_fkey',
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
    };
  },
);

export const club_locations = pgTable(
  'club_locations',
  {
    id: uuid('id').primaryKey().notNull(),
    club_id: uuid('club_id').references(() => clubs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    location_id: uuid('location_id').references(() => locations.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      club_id_location_id: uniqueIndex(
        'club_locations_club_id_location_id',
      ).using('btree', table.club_id, table.location_id),
    };
  },
);

export const connect_invites = pgTable(
  'connect_invites',
  {
    id: uuid('id').primaryKey().notNull(),
    inviter_id: uuid('inviter_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    invitee_id: uuid('invitee_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    is_admin_invite: varchar('is_admin_invite', { length: 255 })
      .default('false')
      .notNull(),
    status: varchar('status', { length: 255 }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      invitee_id: index('connect_invites_invitee_id').using(
        'btree',
        table.invitee_id,
      ),
      inviter_id: index('connect_invites_inviter_id').using(
        'btree',
        table.inviter_id,
      ),
    };
  },
);

export const custom_landing_pages = pgTable(
  'custom_landing_pages',
  {
    id: uuid('id').primaryKey().notNull(),
    internal_tag_id: uuid('internal_tag_id').references(
      () => internal_tags.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    creator_id: uuid('creator_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    name: varchar('name', { length: 255 }),
    description: text('description'),
    url_slug: varchar('url_slug', { length: 255 }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    redirect_url: text('redirect_url'),
  },
  (table) => {
    return {
      url_slug: uniqueIndex('custom_landing_pages_url_slug').using(
        'btree',
        table.url_slug,
      ),
      custom_landing_pages_url_slug_key: unique(
        'custom_landing_pages_url_slug_key',
      ).on(table.url_slug),
    };
  },
);

export const explore_clubs_positions = pgTable(
  'explore_clubs_positions',
  {
    id: uuid('id').primaryKey().notNull(),
    club_id: uuid('club_id').references(() => clubs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    position: integer('position'),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      club_id: uniqueIndex('explore_clubs_positions_club_id').using(
        'btree',
        table.club_id,
      ),
      position: uniqueIndex('explore_clubs_positions_position').using(
        'btree',
        table.position,
      ),
      explore_clubs_positions_position_key: unique(
        'explore_clubs_positions_position_key',
      ).on(table.position),
    };
  },
);

export const caps = pgTable('caps', {
  id: uuid('id').primaryKey().notNull(),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  type: varchar('type', { length: 255 }),
  time_period: varchar('time_period', { length: 255 }),
  max_booking_count: integer('max_booking_count'),
});

export const cecs = pgTable(
  'cecs',
  {
    id: uuid('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }),
    slug: varchar('slug', { length: 255 }),
    customerio_segment_id: varchar('customerio_segment_id', { length: 255 }),
    pre_title: text('pre_title'),
    pre_copy: text('pre_copy'),
    pre_cta_text: varchar('pre_cta_text', { length: 255 }),
    post_title: text('post_title'),
    post_copy: text('post_copy'),
    post_cta_text: varchar('post_cta_text', { length: 255 }),
    post_cta_url: text('post_cta_url'),
    creator_id: uuid('creator_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    image_id: uuid('image_id').references(() => assets.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      cecs_slug_key: unique('cecs_slug_key').on(table.slug),
    };
  },
);

export const club_attributes = pgTable(
  'club_attributes',
  {
    id: uuid('id').primaryKey().notNull(),
    club_id: uuid('club_id').references(() => clubs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    attribute_id: uuid('attribute_id').references(() => attributes.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    attribute_value_id: uuid('attribute_value_id').references(
      () => attribute_values.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      attribute_id_attribute_value_id: index(
        'club_attributes_attribute_id_attribute_value_id',
      ).using('btree', table.attribute_id, table.attribute_value_id),
      club_id: index('club_attributes_club_id').using('btree', table.club_id),
    };
  },
);

export const clubs = pgTable(
  'clubs',
  {
    id: uuid('id').primaryKey().notNull(),
    sid: varchar('sid', { length: 255 }),
    org_id: uuid('org_id').references(() => orgs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    name: varchar('name', { length: 255 }),
    description: text('description'),
    icon_id: uuid('icon_id').references(() => assets.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    cover_id: uuid('cover_id').references(() => assets.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    is_public: boolean('is_public').default(false),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    creator_id: uuid('creator_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    tagline: text('tagline'),
    settings: jsonb('settings'),
    benefit_id: uuid('benefit_id').references(() => benefits.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    program_query_id: uuid('program_query_id').references(
      () => program_queries.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
  },
  (table) => {
    return {
      org_id: index('clubs_org_id').using('btree', table.org_id),
      sid_uk: uniqueIndex('clubs_sid_uk').using(
        'btree',
        sql`lower((sid)::text)`,
      ),
    };
  },
);

export const club_members = pgTable(
  'club_members',
  {
    id: uuid('id').primaryKey().notNull(),
    club_id: uuid('club_id').references(() => clubs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    user_id: uuid('user_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    role: varchar('role', { length: 255 }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      user_id: index('club_members_user_id').using('btree', table.user_id),
      club_members_club_id_user_id_uk: unique(
        'club_members_club_id_user_id_uk',
      ).on(table.club_id, table.user_id),
    };
  },
);

export const club_posts = pgTable(
  'club_posts',
  {
    id: uuid('id').primaryKey().notNull(),
    club_id: uuid('club_id')
      .notNull()
      .references(() => clubs.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    post_id: uuid('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      club_id_created_at_id: index('club_posts_club_id_created_at_id').using(
        'btree',
        table.club_id,
        table.createdAt,
        table.id,
      ),
      club_id_post_id: uniqueIndex('club_posts_club_id_post_id').using(
        'btree',
        table.club_id,
        table.post_id,
      ),
    };
  },
);

export const club_products = pgTable(
  'club_products',
  {
    id: uuid('id').primaryKey().notNull(),
    club_id: uuid('club_id').references(() => clubs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    product_id: uuid('product_id').references(() => products.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    order: integer('order'),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      club_id: index('club_products_club_id').using('btree', table.club_id),
    };
  },
);

export const club_programs = pgTable(
  'club_programs',
  {
    id: uuid('id').primaryKey().notNull(),
    club_id: uuid('club_id').references(() => clubs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    program_id: uuid('program_id').references(() => programs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      club_id: index('club_programs_club_id').using('btree', table.club_id),
      program_id: index('club_programs_program_id').using(
        'btree',
        table.program_id,
      ),
    };
  },
);

export const club_sponsors = pgTable(
  'club_sponsors',
  {
    id: uuid('id').primaryKey().notNull(),
    club_id: uuid('club_id').references(() => clubs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    sponsor_id: uuid('sponsor_id').references(() => sponsors.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    order: integer('order'),
  },
  (table) => {
    return {
      club_id_sponsor_id: uniqueIndex('club_sponsors_club_id_sponsor_id').using(
        'btree',
        table.club_id,
        table.sponsor_id,
      ),
    };
  },
);

export const club_venues = pgTable(
  'club_venues',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    club_id: uuid('club_id')
      .notNull()
      .references(() => clubs.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    venue_id: uuid('venue_id')
      .notNull()
      .references(() => venues.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => {
    return {
      club_id: index('club_venues_club_id').using('btree', table.club_id),
    };
  },
);

export const club_videos = pgTable(
  'club_videos',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    club_id: uuid('club_id').references(() => clubs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    title: varchar('title', { length: 255 }),
    description: varchar('description', { length: 255 }),
    video_url: varchar('video_url', { length: 255 }),
    order: integer('order'),
  },
  (table) => {
    return {
      club_id: index('club_videos_club_id').using('btree', table.club_id),
    };
  },
);

export const club_video_products = pgTable(
  'club_video_products',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    club_video_id: uuid('club_video_id').references(() => club_videos.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    product_id: uuid('product_id').references(() => products.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    order: integer('order'),
  },
  (table) => {
    return {
      club_video_id_product_id: uniqueIndex(
        'club_video_products_club_video_id_product_id',
      ).using('btree', table.club_video_id, table.product_id),
    };
  },
);

export const fee_rules = pgTable('fee_rules', {
  id: uuid('id').primaryKey().notNull(),
  type: varchar('type', { length: 255 }),
  percent_amount: doublePrecision('percent_amount'),
  org_id: uuid('org_id').references(() => orgs.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  creator_id: uuid('creator_id').references(() => users.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const invoices = pgTable('invoices', {
  id: uuid('id').primaryKey().notNull(),
  subtotal_cents: numeric('subtotal_cents'),
  fees_cents: numeric('fees_cents'),
  sales_tax_cents: numeric('sales_tax_cents'),
  amount_billed_cents: numeric('amount_billed_cents'),
  status: varchar('status', { length: 255 }),
  note: text('note'),
  user_id: uuid('user_id').references(() => users.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const lesson_requests = pgTable('lesson_requests', {
  id: uuid('id').primaryKey().notNull(),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  sport: varchar('sport', { length: 255 }),
  requester_first_name: varchar('requester_first_name', { length: 255 }),
  requester_last_name: varchar('requester_last_name', { length: 255 }),
  requester_email: varchar('requester_email', { length: 255 }),
  requester_phone_number: varchar('requester_phone_number', { length: 255 }),
  requester_id: uuid('requester_id').references(() => users.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  requester_message: text('requester_message'),
});

export const line_items = pgTable(
  'line_items',
  {
    id: uuid('id').primaryKey().notNull(),
    sku: varchar('sku', { length: 255 }),
    description: text('description'),
    unit_price_cents: numeric('unit_price_cents'),
    quantity: integer('quantity'),
    total_price_cents: numeric('total_price_cents'),
    note: text('note'),
    info: jsonb('info'),
    invoice_id: uuid('invoice_id').references(() => invoices.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    promo_code_id: uuid('promo_code_id').references(() => promo_codes.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    discount_cents: numeric('discount_cents'),
    discount_percent: numeric('discount_percent'),
    total_discount_cents: numeric('total_discount_cents').default('0'),
    benefit_id: uuid('benefit_id').references(() => benefits.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      benefit_id: index('line_items_benefit_id').using(
        'btree',
        table.benefit_id,
      ),
    };
  },
);

export const nyc_permit_accounts = pgTable('nyc_permit_accounts', {
  id: uuid('id').primaryKey().notNull(),
  email: text('email'),
  password: text('password'),
  notes: text('notes'),
  active: boolean('active').default(true),
  creator_id: uuid('creator_id').references(() => users.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const internal_tags = pgTable(
  'internal_tags',
  {
    id: uuid('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    creator_id: uuid('creator_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    btl_feature: varchar('btl_feature', { length: 255 }),
  },
  (table) => {
    return {
      btl_feature: uniqueIndex('internal_tags_btl_feature').using(
        'btree',
        table.btl_feature,
      ),
      name: uniqueIndex('internal_tags_name').using('btree', table.name),
      internal_tags_name_key: unique('internal_tags_name_key').on(table.name),
    };
  },
);

export const nyc_permit_cards = pgTable('nyc_permit_cards', {
  id: uuid('id').primaryKey().notNull(),
  card_number: text('card_number'),
  card_exp_month: text('card_exp_month'),
  card_exp_year: text('card_exp_year'),
  card_cvv: text('card_cvv'),
  notes: text('notes'),
  active: boolean('active').default(true),
  creator_id: uuid('creator_id').references(() => users.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const order_items = pgTable(
  'order_items',
  {
    id: uuid('id').primaryKey().notNull(),
    order_id: uuid('order_id').references(() => orders.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    program_id: uuid('program_id').references(() => programs.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    user_permit_id: uuid('user_permit_id').references(() => user_permits.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    product_variant_id: uuid('product_variant_id').references(
      () => product_variants.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
    type: varchar('type', { length: 255 }),
    quantity: integer('quantity'),
    fulfilled_at: timestamp('fulfilled_at', {
      withTimezone: true,
      mode: 'string',
    }),
    note: text('note'),
    info: jsonb('info'),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    resource_id: uuid('resource_id').references(() => resources.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    res_reservation_id: uuid('res_reservation_id').references(
      () => res_reservations.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
    program_booking_id: uuid('program_booking_id').references(
      () => program_bookings.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
    user_program_package_id: uuid('user_program_package_id').references(
      () => user_program_packages.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
    line_item_id: uuid('line_item_id').references(() => line_items.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      order_id: index('order_items_order_id').using('btree', table.order_id),
    };
  },
);

export const orders = pgTable(
  'orders',
  {
    id: uuid('id').primaryKey().notNull(),
    org_id: uuid('org_id').references(() => orgs.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    user_id: uuid('user_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    invoice_id: uuid('invoice_id').references(() => invoices.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    shipping_address_id: uuid('shipping_address_id').references(
      () => shipping_addresses.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
    status: varchar('status', { length: 255 }),
    note: text('note'),
    fulfilled_at: timestamp('fulfilled_at', {
      withTimezone: true,
      mode: 'string',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      invoice_id: index('orders_invoice_id').using('btree', table.invoice_id),
      org_id: index('orders_org_id').using('btree', table.org_id),
    };
  },
);

export const org_members = pgTable(
  'org_members',
  {
    id: uuid('id').primaryKey().notNull(),
    org_id: uuid('org_id').references(() => orgs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    user_id: uuid('user_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    role: varchar('role', { length: 255 }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      org_id: index('org_members_org_id').using('btree', table.org_id),
      org_members_user_id_org_id_uk: unique('org_members_user_id_org_id_uk').on(
        table.org_id,
        table.user_id,
      ),
    };
  },
);

export const locations = pgTable(
  'locations',
  {
    id: uuid('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }),
    address_line_1: text('address_line_1'),
    address_line_2: text('address_line_2'),
    city: varchar('city', { length: 255 }),
    state: varchar('state', { length: 255 }),
    country: varchar('country', { length: 255 }),
    postcode: varchar('postcode', { length: 255 }),
    location_page: text('location_page'),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    lat: numeric('lat').default('0').notNull(),
    lon: numeric('lon').default('0').notNull(),
    org_id: uuid('org_id').references(() => orgs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      org_id: index('locations_org_id').using('btree', table.org_id),
    };
  },
);

export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().notNull(),
  user_id: uuid('user_id').references(() => users.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  invoice_id: uuid('invoice_id').references(() => invoices.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  payment_method_id: uuid('payment_method_id').references(
    () => payment_methods.id,
    { onDelete: 'set null', onUpdate: 'cascade' },
  ),
  stripe_card_id: varchar('stripe_card_id', { length: 255 }),
  stripe_payment_intent_id: varchar('stripe_payment_intent_id', {
    length: 255,
  }),
  amount_billed_cents: numeric('amount_billed_cents'),
  amount_paid_cents: numeric('amount_paid_cents'),
  statement_descriptor: varchar('statement_descriptor', { length: 255 }),
  status: varchar('status', { length: 255 }),
  info: jsonb('info'),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  note: text('note'),
});

export const player_profile_quiz = pgTable('player_profile_quiz', {
  quiz_id: uuid('quiz_id').references(() => quizzes.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
});

export const player_profile_quiz_outputs = pgTable(
  'player_profile_quiz_outputs',
  {
    id: uuid('id').primaryKey().notNull(),
    player_level: varchar('player_level', { length: 255 }),
    answers: varchar('answers', { length: 255 }).array(),
  },
  (table) => {
    return {
      answers: index('player_profile_quiz_outputs_answers').using(
        'gin',
        table.answers,
      ),
    };
  },
);

export const orgs = pgTable(
  'orgs',
  {
    id: uuid('id').primaryKey().notNull(),
    name: text('name'),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    sid: varchar('sid', { length: 255 }),
    settings: jsonb('settings'),
    default_program_registration_window_id: uuid(
      'default_program_registration_window_id',
    ).references(() => windows.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    stripe_account_id: varchar('stripe_account_id', { length: 255 }),
  },
  (table) => {
    return {
      sid: uniqueIndex('orgs_sid').using('btree', table.sid),
      orgs_sid_uk: unique('orgs_sid_uk').on(table.sid),
    };
  },
);

export const ott_auth_requests = pgTable(
  'ott_auth_requests',
  {
    id: uuid('id').primaryKey().notNull(),
    user_id: uuid('user_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    ott: varchar('ott', { length: 255 }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      ott: index('ott_auth_requests_ott').using('btree', table.ott),
      user_id: index('ott_auth_requests_user_id').using('btree', table.user_id),
    };
  },
);

export const payment_methods = pgTable(
  'payment_methods',
  {
    id: uuid('id').primaryKey().notNull(),
    user_id: uuid('user_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    billing_address_id: uuid('billing_address_id').references(
      () => addresses.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
    card_brand: varchar('card_brand', { length: 255 }),
    card_last_4: varchar('card_last_4', { length: 255 }),
    name_on_card: varchar('name_on_card', { length: 255 }),
    stripe_customer_id: varchar('stripe_customer_id', { length: 255 }),
    stripe_card_id: varchar('stripe_card_id', { length: 255 }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    card_exp_month: integer('card_exp_month'),
    card_exp_year: integer('card_exp_year'),
    deleted: boolean('deleted').default(false),
  },
  (table) => {
    return {
      stripe_card_id: index('payment_methods_stripe_card_id').using(
        'btree',
        table.stripe_card_id,
      ),
    };
  },
);

export const post_images = pgTable(
  'post_images',
  {
    id: uuid('id').primaryKey().notNull(),
    post_id: uuid('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    image_id: uuid('image_id')
      .notNull()
      .references(() => assets.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    order: integer('order').default(1),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      post_id: index('post_images_post_id').using('btree', table.post_id),
    };
  },
);

export const perms = pgTable('perms', {
  name: varchar('name', { length: 255 }).primaryKey().notNull(),
  label: varchar('label', { length: 255 }),
  description: text('description'),
});

export const pq_org_tags = pgTable(
  'pq_org_tags',
  {
    id: uuid('id').primaryKey().notNull(),
    pq_id: uuid('pq_id').references(() => program_queries.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    neg: boolean('neg').default(false).notNull(),
    op: varchar('op', { length: 255 })
      .default("'EQ'::character varying")
      .notNull(),
    org_tag_id: uuid('org_tag_id').references(() => org_tags.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      pq_id: index('pq_org_tags_pq_id').using('btree', table.pq_id),
    };
  },
);

export const pq_orgs = pgTable(
  'pq_orgs',
  {
    id: uuid('id').primaryKey().notNull(),
    pq_id: uuid('pq_id').references(() => program_queries.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    neg: boolean('neg').default(false).notNull(),
    op: varchar('op', { length: 255 })
      .default("'EQ'::character varying")
      .notNull(),
    org_id: uuid('org_id').references(() => orgs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      pq_id: index('pq_orgs_pq_id').using('btree', table.pq_id),
    };
  },
);

export const pq_participant_price_cents = pgTable(
  'pq_participant_price_cents',
  {
    id: uuid('id').primaryKey().notNull(),
    pq_id: uuid('pq_id').references(() => program_queries.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    neg: boolean('neg').default(false).notNull(),
    op: varchar('op', { length: 255 })
      .default("'EQ'::character varying")
      .notNull(),
    price_cents_a: numeric('price_cents_a'),
    price_cents_b: numeric('price_cents_b'),
  },
  (table) => {
    return {
      pq_id: index('pq_participant_price_cents_pq_id').using(
        'btree',
        table.pq_id,
      ),
    };
  },
);

export const pq_programs = pgTable(
  'pq_programs',
  {
    id: uuid('id').primaryKey().notNull(),
    pq_id: uuid('pq_id').references(() => program_queries.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    neg: boolean('neg').default(false).notNull(),
    op: varchar('op', { length: 255 })
      .default("'EQ'::character varying")
      .notNull(),
    program_id: uuid('program_id').references(() => programs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      pq_id: index('pq_programs_pq_id').using('btree', table.pq_id),
    };
  },
);

export const pq_start_times = pgTable(
  'pq_start_times',
  {
    id: uuid('id').primaryKey().notNull(),
    pq_id: uuid('pq_id').references(() => program_queries.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    neg: boolean('neg').default(false).notNull(),
    op: varchar('op', { length: 255 })
      .default("'EQ'::character varying")
      .notNull(),
    wall_time_a: time('wall_time_a'),
    wall_time_b: time('wall_time_b'),
  },
  (table) => {
    return {
      pq_id: index('pq_start_times_pq_id').using('btree', table.pq_id),
    };
  },
);

export const pro_shops = pgTable(
  'pro_shops',
  {
    id: uuid('id').primaryKey().notNull(),
    pro_page_id: uuid('pro_page_id')
      .notNull()
      .references(() => pro_pages.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    name: text('name'),
    description: text('description'),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      pro_page_id: uniqueIndex('pro_shops_pro_page_id').using(
        'btree',
        table.pro_page_id,
      ),
      pro_shops_pro_page_id_key: unique('pro_shops_pro_page_id_key').on(
        table.pro_page_id,
      ),
    };
  },
);

export const pq_types = pgTable(
  'pq_types',
  {
    id: uuid('id').primaryKey().notNull(),
    pq_id: uuid('pq_id').references(() => program_queries.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    neg: boolean('neg').default(false).notNull(),
    op: varchar('op', { length: 255 })
      .default("'EQ'::character varying")
      .notNull(),
    type: varchar('type', { length: 255 }),
  },
  (table) => {
    return {
      pq_id: index('pq_types_pq_id').using('btree', table.pq_id),
    };
  },
);

export const pq_venues = pgTable(
  'pq_venues',
  {
    id: uuid('id').primaryKey().notNull(),
    pq_id: uuid('pq_id').references(() => program_queries.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    neg: boolean('neg').default(false).notNull(),
    op: varchar('op', { length: 255 })
      .default("'EQ'::character varying")
      .notNull(),
    venue_id: uuid('venue_id').references(() => venues.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      pq_id: index('pq_venues_pq_id').using('btree', table.pq_id),
    };
  },
);

export const pro_page_images = pgTable('pro_page_images', {
  pro_page_id: uuid('pro_page_id').references(() => pro_pages.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  asset_id: uuid('asset_id').references(() => assets.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const pro_pages = pgTable(
  'pro_pages',
  {
    id: uuid('id').primaryKey().notNull(),
    user_id: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    description: text('description'),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    url: text('url'),
  },
  (table) => {
    return {
      url: uniqueIndex('pro_pages_url').using('btree', table.url),
      pro_pages_user_id_key: unique('pro_pages_user_id_key').on(table.user_id),
      pro_pages_url_uk: unique('pro_pages_url_uk').on(table.url),
    };
  },
);

export const pro_shop_item_images = pgTable('pro_shop_item_images', {
  asset_id: uuid('asset_id').references(() => assets.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  pro_shop_item_id: uuid('pro_shop_item_id').references(
    () => pro_shop_items.id,
    { onDelete: 'cascade', onUpdate: 'cascade' },
  ),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const product_images = pgTable(
  'product_images',
  {
    id: uuid('id').primaryKey().notNull(),
    product_id: uuid('product_id').references(() => products.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    image_id: uuid('image_id').references(() => assets.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    order: integer('order'),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      product_id: index('product_images_product_id').using(
        'btree',
        table.product_id,
      ),
    };
  },
);

export const pq_names = pgTable(
  'pq_names',
  {
    id: uuid('id').primaryKey().notNull(),
    pq_id: uuid('pq_id').references(() => program_queries.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    neg: boolean('neg').default(false).notNull(),
    op: varchar('op', { length: 255 })
      .default("'EQ'::character varying")
      .notNull(),
    name: text('name'),
  },
  (table) => {
    return {
      pq_id: index('pq_names_pq_id').using('btree', table.pq_id),
    };
  },
);

export const product_variants = pgTable(
  'product_variants',
  {
    id: uuid('id').primaryKey().notNull(),
    product_id: uuid('product_id').references(() => products.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    name: varchar('name', { length: 255 }),
    description: text('description'),
    price_cents: numeric('price_cents'),
    stock_type: varchar('stock_type', { length: 255 }),
    shipping_required: boolean('shipping_required'),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      product_id: index('product_variants_product_id').using(
        'btree',
        table.product_id,
      ),
    };
  },
);

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().notNull(),
  content: text('content'),
  deleted: boolean('deleted').default(false),
  pinned: boolean('pinned').default(false),
  is_admin_post: boolean('is_admin_post').default(false),
  creator_id: uuid('creator_id').references(() => users.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const products = pgTable(
  'products',
  {
    id: uuid('id').primaryKey().notNull(),
    org_id: uuid('org_id').references(() => orgs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    name: varchar('name', { length: 255 }),
    description: text('description'),
    price_cents: numeric('price_cents'),
    stock_type: varchar('stock_type', { length: 255 }),
    shipping_required: boolean('shipping_required'),
    creator_id: uuid('creator_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    type: varchar('type', { length: 255 })
      .default("'ONSITE'::character varying")
      .notNull(),
    offsite_url: varchar('offsite_url', { length: 255 }),
    offsite_cta: varchar('offsite_cta', { length: 255 }),
    walmart_item_id: varchar('walmart_item_id', { length: 255 }),
  },
  (table) => {
    return {
      org_id: index('products_org_id').using('btree', table.org_id),
    };
  },
);

export const pq_start_dates = pgTable(
  'pq_start_dates',
  {
    id: uuid('id').primaryKey().notNull(),
    pq_id: uuid('pq_id').references(() => program_queries.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    neg: boolean('neg').default(false).notNull(),
    op: varchar('op', { length: 255 })
      .default("'EQ'::character varying")
      .notNull(),
    date_a: date('date_a'),
    date_b: date('date_b'),
  },
  (table) => {
    return {
      pq_id: index('pq_start_dates_pq_id').using('btree', table.pq_id),
    };
  },
);

export const pro_shop_items = pgTable('pro_shop_items', {
  id: uuid('id').primaryKey().notNull(),
  pro_shop_id: uuid('pro_shop_id')
    .notNull()
    .references(() => pro_shops.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  name: text('name'),
  description: text('description'),
  link: text('link'),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const product_variant_images = pgTable(
  'product_variant_images',
  {
    id: uuid('id').primaryKey().notNull(),
    product_variant_id: uuid('product_variant_id').references(
      () => product_variants.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    image_id: uuid('image_id').references(() => assets.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    order: integer('order'),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      product_variant_id: index(
        'product_variant_images_product_variant_id',
      ).using('btree', table.product_variant_id),
    };
  },
);

export const product_variant_option_values = pgTable(
  'product_variant_option_values',
  {
    id: uuid('id').primaryKey().notNull(),
    product_variant_id: uuid('product_variant_id').references(
      () => product_variants.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    variant_option_value_id: uuid('variant_option_value_id').references(
      () => variant_option_values.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      product_variant_id: index(
        'product_variant_option_values_product_variant_id',
      ).using('btree', table.product_variant_id),
      variant_option_value_id: index(
        'product_variant_option_values_variant_option_value_id',
      ).using('btree', table.variant_option_value_id),
    };
  },
);

export const product_variant_stock = pgTable(
  'product_variant_stock',
  {
    id: uuid('id').primaryKey().notNull(),
    product_variant_id: uuid('product_variant_id').references(
      () => product_variants.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    quantity: integer('quantity'),
    type: varchar('type', { length: 255 }),
    note: text('note'),
    creator_id: uuid('creator_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    order_item_id: uuid('order_item_id').references(() => order_items.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      order_item_id: index('product_variant_stock_order_item_id').using(
        'btree',
        table.order_item_id,
      ),
      product_variant_id: index(
        'product_variant_stock_product_variant_id',
      ).using('btree', table.product_variant_id),
    };
  },
);

export const programs = pgTable(
  'programs',
  {
    id: uuid('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description').notNull(),
    date: date('date'),
    start_time: varchar('start_time', { length: 255 }),
    end_time: varchar('end_time', { length: 255 }),
    max_participants: integer('max_participants'),
    participant_price_cents: numeric('participant_price_cents'),
    cancellation_policy: varchar('cancellation_policy', { length: 255 }),
    publish_date: date('publish_date'),
    draft: boolean('draft').default(true).notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    org_id: uuid('org_id').references(() => orgs.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    type: varchar('type', { length: 255 }),
    subtype: varchar('subtype', { length: 255 }),
    pricing_type: varchar('pricing_type', { length: 255 }),
    hidden: boolean('hidden').default(false),
    host_id: uuid('host_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    info: jsonb('info'),
    read_before_booking: text('read_before_booking'),
    min_participants: integer('min_participants').default(0),
    creator_id: uuid('creator_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    tz: varchar('tz'),
    club_membership_requirement: varchar('club_membership_requirement', {
      length: 255,
    }),
    settings: jsonb('settings'),
    allowed_booking_card_brand: varchar('allowed_booking_card_brand', {
      length: 255,
    }),
    venue_id: uuid('venue_id').references(() => venues.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    status: varchar('status', { length: 255 })
      .default("'OK'::character varying")
      .notNull(),
    canceled_at: timestamp('canceled_at', {
      withTimezone: true,
      mode: 'string',
    }),
    canceled_note: text('canceled_note'),
    canceler_id: uuid('canceler_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    sports: varchar('sports', { length: 255 }).array(),
    default_registration_window_id: uuid(
      'default_registration_window_id',
    ).references(() => windows.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      date: index('programs_date').using('btree', table.date),
      host_id: index('programs_host_id').using('btree', table.host_id),
      org_id: index('programs_org_id').using('btree', table.org_id),
      sports_gin_idx: index('programs_sports_gin_idx').using(
        'gin',
        table.sports,
      ),
      venue_id: index('programs_venue_id').using('btree', table.venue_id),
    };
  },
);

export const program_internal_tags = pgTable('program_internal_tags', {
  id: uuid('id').primaryKey().notNull(),
  program_id: uuid('program_id').references(() => programs.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  internal_tag_id: uuid('internal_tag_id').references(() => internal_tags.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  creator_id: uuid('creator_id').references(() => users.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const program_package_items = pgTable(
  'program_package_items',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    query_id: uuid('query_id').references(() => program_queries.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    program_package_id: uuid('program_package_id').references(
      () => program_packages.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    quantity: integer('quantity'),
    description: varchar('description', { length: 255 }).notNull(),
    type: varchar('type', { length: 255 }),
    beneficiary_group_id: uuid('beneficiary_group_id').references(
      () => beneficiary_groups.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
  },
  (table) => {
    return {
      program_package_id: index(
        'program_package_items_program_package_id',
      ).using('btree', table.program_package_id),
    };
  },
);

export const program_packages = pgTable(
  'program_packages',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    order: integer('order').notNull(),
    description: text('description'),
    price_cents: numeric('price_cents').notNull(),
    redemption_term_days: integer('redemption_term_days'),
    redemption_date_start: date('redemption_date_start'),
    redemption_date_end: date('redemption_date_end'),
    expiration_date: date('expiration_date'),
    purchase_status: varchar('purchase_status', { length: 255 }).default(
      "'PURCHASABLE'::character varying",
    ),
    set_id: uuid('set_id').references(() => program_package_sets.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      set_id: index('program_packages_set_id').using('btree', table.set_id),
    };
  },
);

export const program_posts = pgTable(
  'program_posts',
  {
    id: uuid('id').primaryKey().notNull(),
    program_id: uuid('program_id')
      .notNull()
      .references(() => programs.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    post_id: uuid('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      program_id_created_at_id: index(
        'program_posts_program_id_created_at_id',
      ).using('btree', table.program_id, table.createdAt, table.id),
      program_id_post_id: uniqueIndex('program_posts_program_id_post_id').using(
        'btree',
        table.program_id,
        table.post_id,
      ),
    };
  },
);

export const program_package_sets = pgTable(
  'program_package_sets',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    venue_id: uuid('venue_id').references(() => venues.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    org_id: uuid('org_id').references(() => orgs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    name: varchar('name', { length: 255 }).notNull(),
    visibility: varchar('visibility', { length: 255 }).default(
      "'VISIBLE'::character varying",
    ),
    description: text('description'),
    expiration_date: date('expiration_date'),
  },
  (table) => {
    return {
      venue_id_org_id: index('program_package_sets_venue_id_org_id').using(
        'btree',
        table.venue_id,
        table.org_id,
      ),
    };
  },
);

export const promo_code_programs = pgTable('promo_code_programs', {
  promo_code_id: uuid('promo_code_id')
    .notNull()
    .references(() => promo_codes.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  program_id: uuid('program_id')
    .notNull()
    .references(() => programs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const program_queries = pgTable('program_queries', {
  id: uuid('id').primaryKey().notNull(),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const program_attribute_settings = pgTable(
  'program_attribute_settings',
  {
    id: uuid('id').primaryKey().notNull(),
    attribute_id: uuid('attribute_id').references(() => attributes.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    required: boolean('required').default(false),
    search_filterable: boolean('search_filterable').default(false),
    pro_search_filterable: boolean('pro_search_filterable').default(false),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      attribute_id: index('program_attribute_settings_attribute_id').using(
        'btree',
        table.attribute_id,
      ),
    };
  },
);

export const program_bookings = pgTable(
  'program_bookings',
  {
    id: uuid('id').primaryKey().notNull(),
    status: varchar('status', { length: 255 }),
    note: text('note'),
    program_id: uuid('program_id')
      .notNull()
      .references(() => programs.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    participant_id: uuid('participant_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    invoice_id: uuid('invoice_id').references(() => invoices.id),
    checkedin_at: timestamp('checkedin_at', {
      withTimezone: true,
      mode: 'string',
    }),
    checkedin_by: uuid('checkedin_by').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    purchaser_id: uuid('purchaser_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'set null',
        onUpdate: 'cascade',
      }),
    participant_first_name: text('participant_first_name'),
    participant_last_name: text('participant_last_name'),
    participant_email: text('participant_email'),
    participant_phone_number: text('participant_phone_number'),
  },
  (table) => {
    return {
      program_id: index('program_bookings_program_id').using(
        'btree',
        table.program_id,
      ),
    };
  },
);

export const promo_codes = pgTable(
  'promo_codes',
  {
    id: uuid('id').primaryKey().notNull(),
    code: varchar('code', { length: 255 }),
    note: text('note'),
    valid_from: timestamp('valid_from', { withTimezone: true, mode: 'string' }),
    valid_to: timestamp('valid_to', { withTimezone: true, mode: 'string' }),
    discount_cents: numeric('discount_cents'),
    max_total_uses: integer('max_total_uses'),
    max_user_uses: integer('max_user_uses').default(1),
    first_purchase_only: boolean('first_purchase_only'),
    entire_invoice_applicable: boolean('entire_invoice_applicable').default(
      false,
    ),
    active: boolean('active').default(true),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    discount_percent: numeric('discount_percent'),
  },
  (table) => {
    return {
      code: uniqueIndex('promo_codes_code').using('btree', table.code),
      promo_codes_code_key: unique('promo_codes_code_key').on(table.code),
    };
  },
);

export const program_attributes = pgTable(
  'program_attributes',
  {
    id: uuid('id').primaryKey().notNull(),
    program_id: uuid('program_id').references(() => programs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    attribute_id: uuid('attribute_id').references(() => attributes.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    attribute_value_id: uuid('attribute_value_id').references(
      () => attribute_values.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      attribute_id_attribute_value_id: index(
        'program_attributes_attribute_id_attribute_value_id',
      ).using('btree', table.attribute_id, table.attribute_value_id),
      program_id: index('program_attributes_program_id').using(
        'btree',
        table.program_id,
      ),
    };
  },
);

export const program_images = pgTable('program_images', {
  id: uuid('id').primaryKey().notNull(),
  program_id: uuid('program_id').references(() => programs.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  image_id: uuid('image_id').references(() => assets.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  order: integer('order'),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const program_inclusions = pgTable('program_inclusions', {
  id: uuid('id').primaryKey().notNull(),
  description: text('description').notNull(),
  program_id: uuid('program_id').references(() => programs.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const program_locations = pgTable('program_locations', {
  id: uuid('id').primaryKey().notNull(),
  public_description: text('public_description'),
  program_id: uuid('program_id').references(() => programs.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  location_id: uuid('location_id').references(() => locations.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  show_full_address: boolean('show_full_address').default(false),
  booked_description: text('booked_description'),
});

export const program_products = pgTable(
  'program_products',
  {
    id: uuid('id').primaryKey().notNull(),
    program_id: uuid('program_id').references(() => programs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    product_id: uuid('product_id').references(() => products.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    order: integer('order'),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      program_id: index('program_products_program_id').using(
        'btree',
        table.program_id,
      ),
    };
  },
);

export const program_required_club_memberships = pgTable(
  'program_required_club_memberships',
  {
    id: uuid('id').primaryKey().notNull(),
    program_id: uuid('program_id').references(() => programs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    club_id: uuid('club_id').references(() => clubs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      program_id_club_id: uniqueIndex(
        'program_required_club_memberships_program_id_club_id',
      ).using('btree', table.program_id, table.club_id),
    };
  },
);

export const program_tags = pgTable(
  'program_tags',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    creator_id: uuid('creator_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    program_id: uuid('program_id').references(() => programs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    tag_id: uuid('tag_id').references(() => org_tags.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      program_id_tag_id: uniqueIndex('program_tags_program_id_tag_id').using(
        'btree',
        table.program_id,
        table.tag_id,
      ),
    };
  },
);

export const program_waitlist_users = pgTable(
  'program_waitlist_users',
  {
    id: uuid('id').primaryKey().notNull(),
    program_id: uuid('program_id').references(() => programs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    user_id: uuid('user_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    notes: text('notes'),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      program_id_user_id: uniqueIndex(
        'program_waitlist_users_program_id_user_id',
      ).using('btree', table.program_id, table.user_id),
    };
  },
);

export const promo_code_skus = pgTable(
  'promo_code_skus',
  {
    id: uuid('id').primaryKey().notNull(),
    sku: varchar('sku', { length: 255 }),
    promo_code_id: uuid('promo_code_id').references(() => promo_codes.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      promo_code_id_sku: uniqueIndex('promo_code_skus_promo_code_id_sku').using(
        'btree',
        table.promo_code_id,
        table.sku,
      ),
    };
  },
);

export const promo_code_users = pgTable('promo_code_users', {
  promo_code_id: uuid('promo_code_id')
    .notNull()
    .references(() => promo_codes.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  user_id: uuid('user_id').references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const promo_code_uses = pgTable('promo_code_uses', {
  id: uuid('id').primaryKey().notNull(),
  promo_code_id: uuid('promo_code_id')
    .notNull()
    .references(() => promo_codes.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  user_id: uuid('user_id').references(() => users.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  invoice_id: uuid('invoice_id').references(() => invoices.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const purchasable_permits = pgTable('purchasable_permits', {
  id: uuid('id').primaryKey().notNull(),
  name: varchar('name', { length: 255 }),
  sku: varchar('sku', { length: 255 }),
  price_cents: numeric('price_cents'),
  status: varchar('status', { length: 255 }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const quiz_submission_answers = pgTable('quiz_submission_answers', {
  id: uuid('id').primaryKey().notNull(),
  submission_id: uuid('submission_id').references(() => quiz_submissions.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  question_id: uuid('question_id').references(() => quiz_questions.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  answer_id: uuid('answer_id').references(() => quiz_answers.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  question: text('question'),
  answer: text('answer'),
  question_order: integer('question_order'),
});

export const quiz_submissions = pgTable('quiz_submissions', {
  id: uuid('id').primaryKey().notNull(),
  quiz_id: uuid('quiz_id').references(() => quizzes.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  user_id: uuid('user_id').references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  quiz_name: varchar('quiz_name', { length: 255 }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const refunds = pgTable('refunds', {
  id: uuid('id').primaryKey().notNull(),
  amount_cents: numeric('amount_cents'),
  reason: text('reason'),
  payment_id: uuid('payment_id').references(() => payments.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  initiator_id: uuid('initiator_id').references(() => users.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  stripe_refund_id: varchar('stripe_refund_id', { length: 255 }),
  stripe_payment_intent_id: varchar('stripe_payment_intent_id', {
    length: 255,
  }),
  info: jsonb('info'),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const res_finite_schedules = pgTable(
  'res_finite_schedules',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    resource_id: uuid('resource_id').references(() => resources.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    schedule_id: uuid('schedule_id').references(() => res_schedules.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    date_start: date('date_start').notNull(),
    date_end: date('date_end').notNull(),
  },
  (table) => {
    return {
      resource_id: index('res_finite_schedules_resource_id').using(
        'btree',
        table.resource_id,
      ),
    };
  },
);

export const shipping_addresses = pgTable(
  'shipping_addresses',
  {
    id: uuid('id').primaryKey().notNull(),
    user_id: uuid('user_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    recipient_name: varchar('recipient_name', { length: 255 }),
    company_name: varchar('company_name', { length: 255 }),
    line1: varchar('line1', { length: 255 }),
    line2: varchar('line2', { length: 255 }),
    postcode: varchar('postcode', { length: 255 }),
    city: varchar('city', { length: 255 }),
    state: varchar('state', { length: 255 }),
    country: varchar('country', { length: 255 }),
    phone_number: varchar('phone_number', { length: 255 }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      user_id: index('shipping_addresses_user_id').using(
        'btree',
        table.user_id,
      ),
    };
  },
);

export const res_special_hours = pgTable(
  'res_special_hours',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    resource_id: uuid('resource_id').references(() => resources.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    date: date('date'),
    wall_start: time('wall_start'),
    wall_end: time('wall_end'),
    is_all_day: boolean('is_all_day'),
    is_closed: boolean('is_closed'),
    hourly_price_cents: numeric('hourly_price_cents'),
    notes: text('notes'),
  },
  (table) => {
    return {
      resource_id_date: index('res_special_hours_resource_id_date').using(
        'btree',
        table.resource_id,
        table.date,
      ),
    };
  },
);

export const res_schedule_hours = pgTable(
  'res_schedule_hours',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    schedule_id: uuid('schedule_id').references(() => res_schedules.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    day_of_week: text('day_of_week'),
    wall_start: time('wall_start'),
    wall_end: time('wall_end'),
    hourly_price_cents: numeric('hourly_price_cents'),
  },
  (table) => {
    return {
      schedule_id: index('res_schedule_hours_schedule_id').using(
        'btree',
        table.schedule_id,
      ),
    };
  },
);

export const res_types = pgTable(
  'res_types',
  {
    name: varchar('name', { length: 255 }).primaryKey().notNull(),
    label: text('label'),
    description: text('description'),
    category_name: text('category_name'),
    sport: varchar('sport', { length: 255 }),
  },
  (table) => {
    return {
      name: uniqueIndex('res_types_name').using('btree', table.name),
    };
  },
);

export const role_perms = pgTable(
  'role_perms',
  {
    id: uuid('id').primaryKey().notNull(),
    role_id: uuid('role_id').references(() => roles.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    perm: varchar('perm', { length: 255 }).references(() => perms.name, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      role_id_perm: index('role_perms_role_id_perm').using(
        'btree',
        table.role_id,
        table.perm,
      ),
    };
  },
);

export const res_reservations = pgTable(
  'res_reservations',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    resource_id: uuid('resource_id').references(() => resources.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    program_id: uuid('program_id').references(() => programs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    date_start: date('date_start'),
    date_end: date('date_end'),
    wall_start: time('wall_start'),
    wall_end: time('wall_end'),
    notes: text('notes'),
  },
  (table) => {
    return {
      program_id: index('res_reservations_program_id').using(
        'btree',
        table.program_id,
      ),
      resource_id: index('res_reservations_resource_id').using(
        'btree',
        table.resource_id,
      ),
    };
  },
);

export const saas_requests = pgTable('saas_requests', {
  id: uuid('id').primaryKey().notNull(),
  info: jsonb('info'),
  requester_id: uuid('requester_id').references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  club_id: uuid('club_id').references(() => clubs.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const searchable_programs = pgTable('searchable_programs', {
  id: uuid('id'),
  date: date('date'),
  type: varchar('type', { length: 255 }),
  name: varchar('name', { length: 255 }),
  venue_id: uuid('venue_id'),
  location_id: uuid('location_id'),
  state: varchar('state', { length: 255 }),
  city: varchar('city', { length: 255 }),
  attribute_id: uuid('attribute_id'),
  attribute_value_id: uuid('attribute_value_id'),
  host_id: uuid('host_id'),
  internal_tag_id: uuid('internal_tag_id'),
  internal_tag_btl_feature: varchar('internal_tag_btl_feature', {
    length: 255,
  }),
  club_id: uuid('club_id'),
  image_id: uuid('image_id'),
  utc_start: timestamp('utc_start', { mode: 'string' }),
});

export const quizzes = pgTable('quizzes', {
  id: uuid('id').primaryKey().notNull(),
  name: varchar('name', { length: 255 }),
  active: boolean('active').default(true),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const resources = pgTable(
  'resources',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    venue_id: uuid('venue_id').references(() => venues.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    name: text('name'),
    type: varchar('type', { length: 255 }).references(() => res_types.name, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    min_capacity: integer('min_capacity'),
    max_capacity: integer('max_capacity'),
    notes: text('notes'),
    schedule_id: uuid('schedule_id').references(() => res_schedules.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    pricing_type: varchar('pricing_type', { length: 255 }),
    base_hourly_price_cents: numeric('base_hourly_price_cents'),
    default_availability_window_id: uuid(
      'default_availability_window_id',
    ).references(() => windows.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      venue_id_type: index('resources_venue_id_type').using(
        'btree',
        table.venue_id,
        table.type,
      ),
    };
  },
);

export const quiz_questions = pgTable(
  'quiz_questions',
  {
    id: uuid('id').primaryKey().notNull(),
    quiz_id: uuid('quiz_id').references(() => quizzes.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    question: text('question'),
    order: integer('order'),
    active: boolean('active').default(true),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      quiz_id_question: uniqueIndex('quiz_questions_quiz_id_question').using(
        'btree',
        table.quiz_id,
        table.question,
      ),
      quiz_questions_quiz_id_question_uk: unique(
        'quiz_questions_quiz_id_question_uk',
      ).on(table.quiz_id, table.question),
    };
  },
);

export const res_schedules = pgTable(
  'res_schedules',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    creator_id: uuid('creator_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    venue_id: uuid('venue_id').references(() => venues.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    name: text('name'),
    notes: text('notes'),
  },
  (table) => {
    return {
      venue_id: index('res_schedules_venue_id').using('btree', table.venue_id),
    };
  },
);

export const roles = pgTable(
  'roles',
  {
    id: uuid('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }),
    system_code: varchar('system_code', { length: 255 }),
    org_id: uuid('org_id').references(() => orgs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      org_id_name: uniqueIndex('roles_org_id_name').using(
        'btree',
        table.org_id,
        table.name,
      ),
      system_code: uniqueIndex('roles_system_code')
        .using('btree', table.system_code)
        .where(sql`(system_code IS NOT NULL)`),
    };
  },
);

export const user_permits = pgTable(
  'user_permits',
  {
    id: uuid('id').primaryKey().notNull(),
    permit_id: uuid('permit_id').references(() => purchasable_permits.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    permit_info: jsonb('permit_info'),
    application_status: varchar('application_status', { length: 255 }),
    payment_status: varchar('payment_status', { length: 255 }),
    scraper_status: varchar('scraper_status', { length: 255 }),
    fulfillment_status: varchar('fulfillment_status', { length: 255 }),
    scraper_started_date: timestamp('scraper_started_date', {
      withTimezone: true,
      mode: 'string',
    }),
    manual_fulfillment_date: timestamp('manual_fulfillment_date', {
      withTimezone: true,
      mode: 'string',
    }),
    nyc_permit_confirmation_email_received: boolean(
      'nyc_permit_confirmation_email_received',
    ).default(false),
    internal_notes: text('internal_notes'),
    nyc_permit_account_id: uuid('nyc_permit_account_id').references(
      () => nyc_permit_accounts.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
    nyc_permit_card_id: uuid('nyc_permit_card_id').references(
      () => nyc_permit_cards.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
    invoice_id: uuid('invoice_id').references(() => invoices.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    user_id: uuid('user_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    app_first_name: varchar('app_first_name', { length: 255 }),
    app_middle_initial: varchar('app_middle_initial', { length: 255 }),
    app_last_name: varchar('app_last_name', { length: 255 }),
    app_birthdate: date('app_birthdate'),
    app_address_line_1: text('app_address_line_1'),
    app_address_line_2: text('app_address_line_2'),
    app_address_city: text('app_address_city'),
    app_address_state: text('app_address_state'),
    app_address_zipcode: text('app_address_zipcode'),
    app_address_country: text('app_address_country'),
    app_phone_number: text('app_phone_number'),
    app_idnyc_number: text('app_idnyc_number'),
    app_permit_photo_id: uuid('app_permit_photo_id').references(
      () => assets.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
    app_identification_photo_id: uuid('app_identification_photo_id').references(
      () => assets.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
    app_idnyc_photo_id: uuid('app_idnyc_photo_id').references(() => assets.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    manual_fulfiller_id: uuid('manual_fulfiller_id').references(
      () => users.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
    app_email: text('app_email'),
  },
  (table) => {
    return {
      invoice_id: index('user_permits_invoice_id').using(
        'btree',
        table.invoice_id,
      ),
      nyc_permit_account_id: index('user_permits_nyc_permit_account_id').using(
        'btree',
        table.nyc_permit_account_id,
      ),
      nyc_permit_card_id: index('user_permits_nyc_permit_card_id').using(
        'btree',
        table.nyc_permit_card_id,
      ),
      permit_id: index('user_permits_permit_id').using(
        'btree',
        table.permit_id,
      ),
      scraper_status: index('user_permits_scraper_status').using(
        'btree',
        table.scraper_status,
      ),
      user_id: index('user_permits_user_id').using('btree', table.user_id),
    };
  },
);

export const subscription_provisions = pgTable(
  'subscription_provisions',
  {
    id: uuid('id').primaryKey().notNull(),
    status: varchar('status', { length: 255 }),
    subscription_id: uuid('subscription_id').references(
      () => subscriptions.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    role_id: uuid('role_id').references(() => roles.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      status: index('subscription_provisions_status').using(
        'btree',
        table.status,
      ),
      subscription_id_role_id: uniqueIndex(
        'subscription_provisions_subscription_id_role_id',
      ).using('btree', table.subscription_id, table.role_id),
    };
  },
);

export const subscription_plans = pgTable(
  'subscription_plans',
  {
    id: uuid('id').primaryKey().notNull(),
    system_code: varchar('system_code', { length: 255 }),
    org_id: uuid('org_id').references(() => orgs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    name: varchar('name', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }),
    internal_notes: text('internal_notes'),
    status: varchar('status', { length: 255 }),
    billing_interval: varchar('billing_interval', { length: 255 }),
    price_cents: numeric('price_cents'),
    trial_days: integer('trial_days'),
    creator_id: uuid('creator_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      org_id: index('subscription_plans_org_id').using('btree', table.org_id),
      system_code: uniqueIndex('subscription_plans_system_code')
        .using('btree', table.system_code)
        .where(sql`(system_code IS NOT NULL)`),
    };
  },
);

export const user_interested_play_locations = pgTable(
  'user_interested_play_locations',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    user_id: uuid('user_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    google_place_id: varchar('google_place_id', { length: 255 }),
    country: varchar('country', { length: 255 }),
    region: varchar('region', { length: 255 }),
    city: varchar('city', { length: 255 }),
    lat: doublePrecision('lat'),
    lon: doublePrecision('lon'),
    info: jsonb('info'),
  },
  (table) => {
    return {
      city: index('user_interested_play_locations_city').using(
        'btree',
        table.city,
      ),
      user_id: index('user_interested_play_locations_user_id').using(
        'btree',
        table.user_id,
      ),
    };
  },
);

export const user_package_item_beneficiary_group_uses = pgTable(
  'user_package_item_beneficiary_group_uses',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    user_package_item_id: uuid('user_package_item_id').references(
      () => user_program_package_items.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    beneficiary_group_user_id: uuid('beneficiary_group_user_id').references(
      () => beneficiary_group_users.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
  },
  (table) => {
    return {
      user_package_item_id_b: uniqueIndex(
        'user_package_item_beneficiary_group_uses_user_package_item_id_b',
      ).using(
        'btree',
        table.user_package_item_id,
        table.beneficiary_group_user_id,
      ),
    };
  },
);

export const user_program_packages = pgTable(
  'user_program_packages',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    org_id: uuid('org_id').references(() => orgs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    venue_id: uuid('venue_id').references(() => venues.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    program_package_id: uuid('program_package_id').references(
      () => program_packages.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    price_cents: numeric('price_cents').notNull(),
    redemption_term_days: integer('redemption_term_days'),
    redemption_date_start: date('redemption_date_start'),
    redemption_date_end: date('redemption_date_end'),
    status: varchar('status', { length: 255 }).default(
      "'ACTIVE'::character varying",
    ),
    user_id: uuid('user_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    purchaser_id: uuid('purchaser_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    canceler_id: uuid('canceler_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    canceled_note: text('canceled_note'),
    canceled_at: timestamp('canceled_at', {
      withTimezone: true,
      mode: 'string',
    }),
  },
  (table) => {
    return {
      program_package_id: index(
        'user_program_packages_program_package_id',
      ).using('btree', table.program_package_id),
      purchaser_id: index('user_program_packages_purchaser_id').using(
        'btree',
        table.purchaser_id,
      ),
      user_id: index('user_program_packages_user_id').using(
        'btree',
        table.user_id,
      ),
    };
  },
);

export const user_password_resets = pgTable(
  'user_password_resets',
  {
    id: uuid('id').primaryKey().notNull(),
    user_id: uuid('user_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      user_id: uniqueIndex('user_password_resets_user_id').using(
        'btree',
        table.user_id,
      ),
      user_password_resets_user_id_uk: unique(
        'user_password_resets_user_id_uk',
      ).on(table.user_id),
    };
  },
);

export const variant_option_values = pgTable(
  'variant_option_values',
  {
    id: uuid('id').primaryKey().notNull(),
    variant_option_id: uuid('variant_option_id').references(
      () => variant_options.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    name: varchar('name', { length: 255 }),
    order: integer('order'),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      variant_option_id: index('variant_option_values_variant_option_id').using(
        'btree',
        table.variant_option_id,
      ),
    };
  },
);

export const user_settings = pgTable(
  'user_settings',
  {
    id: uuid('id').primaryKey().notNull(),
    user_id: uuid('user_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    app_notifications_enabled: boolean('app_notifications_enabled'),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      user_id: uniqueIndex('user_settings_user_id').using(
        'btree',
        table.user_id,
      ),
    };
  },
);

export const sponsors = pgTable(
  'sponsors',
  {
    id: uuid('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }),
    notes: text('notes'),
    org_id: uuid('org_id').references(() => orgs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    logo_id: uuid('logo_id').references(() => assets.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    icon_id: uuid('icon_id').references(() => assets.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    creator_id: uuid('creator_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    link: text('link'),
  },
  (table) => {
    return {
      org_id: index('sponsors_org_id').using('btree', table.org_id),
    };
  },
);

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull(),
    number: varchar('number', { length: 255 }),
    hash: varchar('hash', { length: 255 }),
    passwordToken: varchar('passwordToken', { length: 255 }),
    passwordTokenCreatedDate: timestamp('passwordTokenCreatedDate', {
      withTimezone: true,
      mode: 'string',
    }),
    token: varchar('token', { length: 255 }),
    type: varchar('type', { length: 255 }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    firstName: varchar('firstName', { length: 255 }),
    lastName: varchar('lastName', { length: 255 }),
    stripe_customer_id: varchar('stripe_customer_id', { length: 255 }),
    player_level: varchar('player_level', { length: 255 }),
    gender: varchar('gender', { length: 255 }),
    birthdate: timestamp('birthdate', { withTimezone: true, mode: 'string' }),
    location: text('location'),
    occupation: text('occupation'),
    profile_image_id: uuid('profile_image_id').references(
      (): AnyPgColumn => assets.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
    sendbird_user_id: varchar('sendbird_user_id', { length: 255 }),
    eqx_member_id: text('eqx_member_id'),
    eqx_info: jsonb('eqx_info').default({}),
  },
  (table) => {
    return {
      eqx_info: index('users_eqx_info').using('gin', table.eqx_info),
      eqx_member_id: uniqueIndex('users_eqx_member_id').using(
        'btree',
        table.eqx_member_id,
      ),
      users_email_key: unique('users_email_key').on(table.email),
    };
  },
);

export const subscription_invoices = pgTable(
  'subscription_invoices',
  {
    id: uuid('id').primaryKey().notNull(),
    subscription_id: uuid('subscription_id').references(
      () => subscriptions.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    invoice_id: uuid('invoice_id').references(() => invoices.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      subscription_id: index('subscription_invoices_subscription_id').using(
        'btree',
        table.subscription_id,
      ),
    };
  },
);

export const subscriptions = pgTable(
  'subscriptions',
  {
    id: uuid('id').primaryKey().notNull(),
    plan_id: uuid('plan_id').references(() => subscription_plans.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    subscriber_id: uuid('subscriber_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    payment_method_id: uuid('payment_method_id')
      .notNull()
      .references(() => payment_methods.id, {
        onDelete: 'set null',
        onUpdate: 'cascade',
      }),
    internal_notes: text('internal_notes'),
    name: varchar('name', { length: 255 }),
    description: varchar('description', { length: 255 }),
    start: timestamp('start', { withTimezone: true, mode: 'string' }),
    end: timestamp('end', { withTimezone: true, mode: 'string' }),
    billing_interval: varchar('billing_interval', { length: 255 }),
    next_bill_date: timestamp('next_bill_date', {
      withTimezone: true,
      mode: 'string',
    }),
    price_cents: numeric('price_cents'),
    trial_end: timestamp('trial_end', { withTimezone: true, mode: 'string' }),
    status: varchar('status', { length: 255 }),
    provisioned_status: varchar('provisioned_status', { length: 255 }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      plan_id_subscriber_id: uniqueIndex(
        'subscriptions_plan_id_subscriber_id',
      ).using('btree', table.plan_id, table.subscriber_id),
      status: index('subscriptions_status').using('btree', table.status),
      subscriber_id: index('subscriptions_subscriber_id').using(
        'btree',
        table.subscriber_id,
      ),
    };
  },
);

export const transfers = pgTable(
  'transfers',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    org_id: uuid('org_id')
      .notNull()
      .references(() => orgs.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    invoice_id: uuid('invoice_id')
      .notNull()
      .references(() => invoices.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    stripe_transfer_id: varchar('stripe_transfer_id', { length: 255 }),
    amount_transferred_cents: integer('amount_transferred_cents'),
    status: varchar('status', { length: 255 }),
    info: json('info'),
    note: varchar('note', { length: 255 }),
  },
  (table) => {
    return {
      invoice_id: index('transfers_invoice_id').using(
        'btree',
        table.invoice_id,
      ),
      org_id: index('transfers_org_id').using('btree', table.org_id),
    };
  },
);

export const user_program_package_items = pgTable(
  'user_program_package_items',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    query_id: uuid('query_id').references(() => program_queries.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    user_program_package_id: uuid('user_program_package_id').references(
      () => user_program_packages.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    quantity: integer('quantity'),
    description: varchar('description', { length: 255 }).notNull(),
    type: varchar('type', { length: 255 }),
    beneficiary_group_id: uuid('beneficiary_group_id').references(
      () => beneficiary_groups.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
  },
  (table) => {
    return {
      user_program_package_id: index(
        'user_program_package_items_user_program_package_id',
      ).using('btree', table.user_program_package_id),
    };
  },
);

export const user_profile_attribute_settings = pgTable(
  'user_profile_attribute_settings',
  {
    id: uuid('id').primaryKey().notNull(),
    attribute_id: uuid('attribute_id').references(() => attributes.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    required: boolean('required').default(false),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      attribute_id: index('user_profile_attribute_settings_attribute_id').using(
        'btree',
        table.attribute_id,
      ),
    };
  },
);

export const user_profile_attributes = pgTable(
  'user_profile_attributes',
  {
    id: uuid('id').primaryKey().notNull(),
    user_id: uuid('user_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    attribute_id: uuid('attribute_id').references(() => attributes.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    attribute_value_id: uuid('attribute_value_id').references(
      () => attribute_values.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      attribute_id_attribute_value_id: index(
        'user_profile_attributes_attribute_id_attribute_value_id',
      ).using('btree', table.attribute_id, table.attribute_value_id),
      user_id: index('user_profile_attributes_user_id').using(
        'btree',
        table.user_id,
      ),
    };
  },
);

export const user_program_package_item_uses = pgTable(
  'user_program_package_item_uses',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    user_package_item_id: uuid('user_package_item_id').references(
      () => user_program_package_items.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    booking_id: uuid('booking_id').references(() => program_bookings.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      booking_id: index('user_program_package_item_uses_booking_id').using(
        'btree',
        table.booking_id,
      ),
      user_item_id: index('user_program_package_item_uses_user_item_id').using(
        'btree',
        table.user_package_item_id,
      ),
    };
  },
);

export const user_roles = pgTable(
  'user_roles',
  {
    id: uuid('id').primaryKey().notNull(),
    user_id: uuid('user_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    role_id: uuid('role_id').references(() => roles.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    creator_id: uuid('creator_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    src: varchar('src', { length: 255 }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      role_id_user_id: uniqueIndex('user_roles_role_id_user_id').using(
        'btree',
        table.role_id,
        table.user_id,
      ),
      user_id: index('user_roles_user_id').using('btree', table.user_id),
    };
  },
);

export const user_sessions = pgTable(
  'user_sessions',
  {
    id: uuid('id').primaryKey().notNull(),
    user_id: uuid('user_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    session_id: uuid('session_id'),
    data: jsonb('data'),
    ip_address: varchar('ip_address', { length: 255 }),
    user_agent: varchar('user_agent', { length: 255 }),
    last_href: text('last_href'),
    last_seen: timestamp('last_seen', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      last_seen: index('user_sessions_last_seen').using(
        'btree',
        table.last_seen,
      ),
      session_id: uniqueIndex('user_sessions_session_id').using(
        'btree',
        table.session_id,
      ),
      user_id: index('user_sessions_user_id').using('btree', table.user_id),
    };
  },
);

export const variant_options = pgTable(
  'variant_options',
  {
    id: uuid('id').primaryKey().notNull(),
    org_id: uuid('org_id').references(() => orgs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    name: varchar('name', { length: 255 }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      org_id: index('variant_options_org_id').using('btree', table.org_id),
    };
  },
);

export const venue_homepage_faqs = pgTable(
  'venue_homepage_faqs',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    homepage_id: uuid('homepage_id').references(() => venue_homepages.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    name: text('name'),
    description: text('description'),
    order: integer('order'),
  },
  (table) => {
    return {
      homepage_id: index('venue_homepage_faqs_homepage_id').using(
        'btree',
        table.homepage_id,
      ),
    };
  },
);

export const venue_images = pgTable('venue_images', {
  id: uuid('id').primaryKey().notNull(),
  venue_id: uuid('venue_id').references(() => venues.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  image_id: uuid('image_id').references(() => assets.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  order: integer('order'),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const venue_lesson_requests = pgTable(
  'venue_lesson_requests',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    venue_id: uuid('venue_id').references(() => venues.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    customer_id: uuid('customer_id').references(() => venue_customers.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    lesson_request_id: uuid('lesson_request_id').references(
      () => lesson_requests.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
  },
  (table) => {
    return {
      venue_id: index('venue_lesson_requests_venue_id').using(
        'btree',
        table.venue_id,
      ),
    };
  },
);

export const venue_team_members = pgTable(
  'venue_team_members',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    venue_id: uuid('venue_id').references(() => venues.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    user_id: uuid('user_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      venue_id_user_id: uniqueIndex(
        'venue_team_members_venue_id_user_id',
      ).using('btree', table.venue_id, table.user_id),
    };
  },
);

export const windows = pgTable('windows', {
  id: uuid('id').primaryKey().notNull(),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  name: varchar('name', { length: 255 }),
  date_start: date('date_start'),
  date_end: date('date_end'),
  wall_start: time('wall_start'),
  wall_end: time('wall_end'),
  type: varchar('type', { length: 255 }).notNull(),
  rel_unit_end: varchar('rel_unit_end', { length: 255 }),
  rel_value_end: integer('rel_value_end'),
  rel_unit_start: varchar('rel_unit_start', { length: 255 }),
  rel_value_start: integer('rel_value_start'),
});

export const venue_available_lessons = pgTable(
  'venue_available_lessons',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    venue_id: uuid('venue_id').references(() => venues.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    sport: varchar('sport', { length: 255 }),
    notify_emails: varchar('notify_emails', { length: 255 }).array(),
  },
  (table) => {
    return {
      venue_id: index('venue_available_lessons_venue_id').using(
        'btree',
        table.venue_id,
      ),
    };
  },
);

export const venue_customers = pgTable(
  'venue_customers',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    org_customer_id: uuid('org_customer_id').references(() => customers.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    venue_id: uuid('venue_id').references(() => venues.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      org_customer_id_venue_id: uniqueIndex(
        'venue_customers_org_customer_id_venue_id',
      ).using('btree', table.org_customer_id, table.venue_id),
      venue_id: index('venue_customers_venue_id').using(
        'btree',
        table.venue_id,
      ),
    };
  },
);

export const venue_homepages = pgTable('venue_homepages', {
  id: uuid('id').primaryKey().notNull(),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  creator_id: uuid('creator_id').references(() => users.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  title: text('title'),
  description: text('description'),
  faq_section_title: text('faq_section_title'),
  settings: jsonb('settings'),
});

export const venue_open_hours = pgTable(
  'venue_open_hours',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    venue_id: uuid('venue_id').references(() => venues.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    day_of_week: text('day_of_week'),
    wall_start: time('wall_start'),
    wall_end: time('wall_end'),
  },
  (table) => {
    return {
      venue_id: index('venue_open_hours_venue_id').using(
        'btree',
        table.venue_id,
      ),
    };
  },
);

export const asset_delete_queue = pgTable('asset_delete_queue', {
  id: uuid('id').primaryKey().notNull(),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  asset_id: uuid('asset_id').references(() => assets.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
});

export const customers = pgTable(
  'customers',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    org_id: uuid('org_id').references(() => orgs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    user_id: uuid('user_id').references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      org_id_user_id: uniqueIndex('customers_org_id_user_id').using(
        'btree',
        table.org_id,
        table.user_id,
      ),
      user_id: index('customers_user_id').using('btree', table.user_id),
    };
  },
);

export const org_tags = pgTable('org_tags', {
  id: uuid('id').primaryKey().notNull(),
  createdAt: timestamp('createdAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  updatedAt: timestamp('updatedAt', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  org_id: uuid('org_id').references(() => orgs.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  creator_id: uuid('creator_id').references(() => users.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  name: varchar('name', { length: 255 }).notNull(),
  label: varchar('label', { length: 255 }),
  color: varchar('color', { length: 255 }),
});

export const venues = pgTable(
  'venues',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    sid: text('sid'),
    name: text('name'),
    org_id: uuid('org_id').references(() => orgs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    address_id: uuid('address_id').references(() => addresses.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    phone_number: text('phone_number'),
    email: text('email'),
    tz: text('tz'),
    homepage_id: uuid('homepage_id').references(() => venue_homepages.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    settings: jsonb('settings'),
    bookability: varchar('bookability', { length: 255 }),
    official_website_url: varchar('official_website_url', { length: 255 }),
    default_res_availability_window_id: uuid(
      'default_res_availability_window_id',
    ).references(() => windows.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    default_program_registration_window_id: uuid(
      'default_program_registration_window_id',
    ).references(() => windows.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      org_id: index('venues_org_id').using('btree', table.org_id),
      sid: uniqueIndex('venues_sid').using('btree', table.sid),
    };
  },
);

export const cec_emails = pgTable(
  'cec_emails',
  {
    id: uuid('id').primaryKey().notNull(),
    cec_id: uuid('cec_id').references(() => cecs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    email: varchar('email', { length: 255 }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      cec_id: index('cec_emails_cec_id').using('btree', table.cec_id),
    };
  },
);

export const pq_start_dows = pgTable(
  'pq_start_dows',
  {
    id: uuid('id').primaryKey().notNull(),
    pq_id: uuid('pq_id').references(() => program_queries.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    neg: boolean('neg').default(false).notNull(),
    op: varchar('op', { length: 255 })
      .default("'EQ'::character varying")
      .notNull(),
    dow: varchar('dow', { length: 255 }),
  },
  (table) => {
    return {
      pq_id: index('pq_start_dows_pq_id').using('btree', table.pq_id),
    };
  },
);

export const program_sponsors = pgTable(
  'program_sponsors',
  {
    id: uuid('id').primaryKey().notNull(),
    program_id: uuid('program_id').references(() => programs.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    sponsor_id: uuid('sponsor_id').references(() => sponsors.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    order: integer('order'),
  },
  (table) => {
    return {
      program_id_sponsor_id: uniqueIndex(
        'program_sponsors_program_id_sponsor_id',
      ).using('btree', table.program_id, table.sponsor_id),
    };
  },
);

export const quiz_answers = pgTable(
  'quiz_answers',
  {
    id: uuid('id').primaryKey().notNull(),
    question_id: uuid('question_id').references(() => quiz_questions.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    answer: text('answer'),
    order: integer('order'),
    active: boolean('active').default(true),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      question_id_answer: uniqueIndex('quiz_answers_question_id_answer').using(
        'btree',
        table.question_id,
        table.answer,
      ),
      quiz_answers_question_id_answer_uk: unique(
        'quiz_answers_question_id_answer_uk',
      ).on(table.question_id, table.answer),
    };
  },
);

export const subscription_plan_provisions = pgTable(
  'subscription_plan_provisions',
  {
    id: uuid('id').primaryKey().notNull(),
    plan_id: uuid('plan_id').references(() => subscription_plans.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    role_id: uuid('role_id').references(() => roles.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      plan_id_role_id: uniqueIndex(
        'subscription_plan_provisions_plan_id_role_id',
      ).using('btree', table.plan_id, table.role_id),
    };
  },
);

export const venue_homepage_callouts = pgTable(
  'venue_homepage_callouts',
  {
    id: uuid('id').primaryKey().notNull(),
    createdAt: timestamp('createdAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    updatedAt: timestamp('updatedAt', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),
    homepage_id: uuid('homepage_id').references(() => venue_homepages.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    title: varchar('title', { length: 255 }).notNull(),
    order: integer('order').notNull(),
    url: varchar('url', { length: 255 }),
    image_id: uuid('image_id').references(() => assets.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      homepage_id: index('venue_homepage_callouts_homepage_id').using(
        'btree',
        table.homepage_id,
      ),
    };
  },
);
