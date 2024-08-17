-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "beneficiary_group_verification_emails" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"type" varchar(255) NOT NULL,
	"allowed" boolean NOT NULL,
	"value" varchar(255) NOT NULL,
	"beneficiary_group_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "benefit_bookings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"benefit_id" uuid,
	"beneficiary_group_id" uuid,
	"beneficiary_id" uuid,
	"program_booking_id" uuid,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SequelizeMeta" (
	"name" varchar(255) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "attributes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"type" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "beneficiaries" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"benefit_id" uuid,
	"customer_id" uuid,
	"status" varchar(255) DEFAULT 'OK'::character varying NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "beneficiary_group_exclusive_blocks" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"beneficiary_group_id" uuid,
	"benefit_block_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "beneficiary_group_exclusive_programs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"beneficiary_group_id" uuid,
	"benefit_program_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "benefit_faqs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"benefit_id" uuid,
	"name" varchar(255),
	"description" text,
	"order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "addresses" (
	"id" uuid PRIMARY KEY NOT NULL,
	"country" varchar(255),
	"line_1" text,
	"line_2" text,
	"city" varchar(255),
	"state" varchar(255),
	"postcode" varchar(255),
	"lat" varchar(255),
	"lon" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "beneficiary_group_users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"beneficiary_group_id" uuid,
	"beneficiary_id" uuid,
	"verification_info" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assets" (
	"id" uuid PRIMARY KEY NOT NULL,
	"key" text,
	"filename" text,
	"extension" text,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"creator_id" uuid,
	CONSTRAINT "assets_key_filename" UNIQUE("key","filename")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "attribute_values" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"attribute_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "beneficiary_groups" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"benefit_id" uuid,
	"name" varchar(255),
	"description" text,
	"status" varchar(255),
	"verification_method" varchar(255),
	"verification_name" varchar(255),
	"verification_description" varchar(255),
	"verification_settings" jsonb,
	"base_discount_percent" numeric,
	"base_discount_cents" numeric,
	"verification_fallback_message" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "beneficiary_group_caps" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"beneficiary_group_id" uuid,
	"cap_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "benefit_blocks" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"benefit_venue_id" uuid,
	"resource_id" uuid,
	"notes" text,
	"date_start" date,
	"date_end" date,
	"wall_start" time,
	"wall_end" time,
	"pricing_type" text,
	"benefactor_hourly_cost_cents" numeric,
	"benefit_exclusive" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "benefit_programs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"benefit_id" uuid,
	"program_id" uuid,
	"checkin_instructions" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "benefit_venue_faqs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"benefit_venue_id" uuid,
	"name" text,
	"description" text,
	"order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "benefit_venues" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"benefit_id" uuid,
	"venue_id" uuid,
	"status" varchar(255),
	"checkin_instructions" text,
	"visible_reservation_days" integer,
	"description" text,
	"faq_section_title" text,
	"settings" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "benefits" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"sid" varchar(255) NOT NULL,
	"creator_id" uuid,
	"org_id" uuid,
	"name" text NOT NULL,
	"description" text,
	"status" text,
	"date_start" date,
	"date_end" date,
	"wall_start" time,
	"wall_end" time,
	"tz" text,
	"color" text,
	"settings" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "benefit_venue_permitted_beneficiary_groups" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"beneficiary_group_id" uuid,
	"benefit_venue_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "benefit_venue_permitted_resources" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"resource_id" uuid,
	"benefit_venue_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "benefit_venue_tags" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"creator_id" uuid,
	"benefit_venue_id" uuid,
	"tag_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blocked_users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"blocked_user_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "btl_featured_facilities" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"title" text,
	"org_id" uuid,
	"venue_id" uuid,
	"url" text,
	"sport" text,
	"order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "btl_featured_geos" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"title" text,
	"country" text,
	"state" text,
	"city" text,
	"image_id" uuid,
	"order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "btl_org" (
	"org_id" uuid NOT NULL,
	"single_row" boolean DEFAULT true,
	CONSTRAINT "btl_org_single_row_key" UNIQUE("single_row")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "club_attribute_settings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"attribute_id" uuid,
	"web_filterable" boolean DEFAULT false,
	"app_filterable" boolean DEFAULT false,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"post_id" uuid,
	"parent_comment_id" uuid,
	"thread_id" uuid,
	"comment" text,
	"deleted" boolean DEFAULT false,
	"is_admin_comment" boolean DEFAULT false,
	"creator_id" uuid NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "club_locations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"club_id" uuid,
	"location_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "connect_invites" (
	"id" uuid PRIMARY KEY NOT NULL,
	"inviter_id" uuid,
	"invitee_id" uuid,
	"is_admin_invite" varchar(255) DEFAULT false NOT NULL,
	"status" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "custom_landing_pages" (
	"id" uuid PRIMARY KEY NOT NULL,
	"internal_tag_id" uuid,
	"creator_id" uuid,
	"name" varchar(255),
	"description" text,
	"url_slug" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"redirect_url" text,
	CONSTRAINT "custom_landing_pages_url_slug_key" UNIQUE("url_slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "explore_clubs_positions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"club_id" uuid,
	"position" integer,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "explore_clubs_positions_position_key" UNIQUE("position")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "caps" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"type" varchar(255),
	"time_period" varchar(255),
	"max_booking_count" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cecs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"slug" varchar(255),
	"customerio_segment_id" varchar(255),
	"pre_title" text,
	"pre_copy" text,
	"pre_cta_text" varchar(255),
	"post_title" text,
	"post_copy" text,
	"post_cta_text" varchar(255),
	"post_cta_url" text,
	"creator_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"image_id" uuid,
	CONSTRAINT "cecs_slug_key" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "club_attributes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"club_id" uuid,
	"attribute_id" uuid,
	"attribute_value_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clubs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"sid" varchar(255),
	"org_id" uuid,
	"name" varchar(255),
	"description" text,
	"icon_id" uuid,
	"cover_id" uuid,
	"is_public" boolean DEFAULT false,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"creator_id" uuid,
	"tagline" text,
	"settings" jsonb,
	"benefit_id" uuid,
	"program_query_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "club_members" (
	"id" uuid PRIMARY KEY NOT NULL,
	"club_id" uuid,
	"user_id" uuid,
	"role" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "club_members_club_id_user_id_uk" UNIQUE("club_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "club_posts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"club_id" uuid NOT NULL,
	"post_id" uuid NOT NULL,
	"createdAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "club_products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"club_id" uuid,
	"product_id" uuid,
	"order" integer,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "club_programs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"club_id" uuid,
	"program_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "club_sponsors" (
	"id" uuid PRIMARY KEY NOT NULL,
	"club_id" uuid,
	"sponsor_id" uuid,
	"order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "club_venues" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"club_id" uuid NOT NULL,
	"venue_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "club_videos" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"club_id" uuid,
	"title" varchar(255),
	"description" varchar(255),
	"video_url" varchar(255),
	"order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "club_video_products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"club_video_id" uuid,
	"product_id" uuid,
	"order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fee_rules" (
	"id" uuid PRIMARY KEY NOT NULL,
	"type" varchar(255),
	"percent_amount" double precision,
	"org_id" uuid,
	"creator_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoices" (
	"id" uuid PRIMARY KEY NOT NULL,
	"subtotal_cents" numeric,
	"fees_cents" numeric,
	"sales_tax_cents" numeric,
	"amount_billed_cents" numeric,
	"status" varchar(255),
	"note" text,
	"user_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lesson_requests" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"sport" varchar(255),
	"requester_first_name" varchar(255),
	"requester_last_name" varchar(255),
	"requester_email" varchar(255),
	"requester_phone_number" varchar(255),
	"requester_id" uuid,
	"requester_message" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "line_items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"sku" varchar(255),
	"description" text,
	"unit_price_cents" numeric,
	"quantity" integer,
	"total_price_cents" numeric,
	"note" text,
	"info" jsonb,
	"invoice_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"promo_code_id" uuid,
	"discount_cents" numeric,
	"discount_percent" numeric,
	"total_discount_cents" numeric DEFAULT 0,
	"benefit_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nyc_permit_accounts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text,
	"password" text,
	"notes" text,
	"active" boolean DEFAULT true,
	"creator_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "internal_tags" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"creator_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"btl_feature" varchar(255),
	CONSTRAINT "internal_tags_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nyc_permit_cards" (
	"id" uuid PRIMARY KEY NOT NULL,
	"card_number" text,
	"card_exp_month" text,
	"card_exp_year" text,
	"card_cvv" text,
	"notes" text,
	"active" boolean DEFAULT true,
	"creator_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"order_id" uuid,
	"program_id" uuid,
	"user_permit_id" uuid,
	"product_variant_id" uuid,
	"type" varchar(255),
	"quantity" integer,
	"fulfilled_at" timestamp with time zone,
	"note" text,
	"info" jsonb,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"resource_id" uuid,
	"res_reservation_id" uuid,
	"program_booking_id" uuid,
	"user_program_package_id" uuid,
	"line_item_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" uuid PRIMARY KEY NOT NULL,
	"org_id" uuid,
	"user_id" uuid,
	"invoice_id" uuid,
	"shipping_address_id" uuid,
	"status" varchar(255),
	"note" text,
	"fulfilled_at" timestamp with time zone,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_members" (
	"id" uuid PRIMARY KEY NOT NULL,
	"org_id" uuid,
	"user_id" uuid,
	"role" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "org_members_user_id_org_id_uk" UNIQUE("org_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "locations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"address_line_1" text,
	"address_line_2" text,
	"city" varchar(255),
	"state" varchar(255),
	"country" varchar(255),
	"postcode" varchar(255),
	"location_page" text,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"lat" numeric DEFAULT 0 NOT NULL,
	"lon" numeric DEFAULT 0 NOT NULL,
	"org_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"invoice_id" uuid,
	"payment_method_id" uuid,
	"stripe_card_id" varchar(255),
	"stripe_payment_intent_id" varchar(255),
	"amount_billed_cents" numeric,
	"amount_paid_cents" numeric,
	"statement_descriptor" varchar(255),
	"status" varchar(255),
	"info" jsonb,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"note" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "player_profile_quiz" (
	"quiz_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "player_profile_quiz_outputs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"player_level" varchar(255),
	"answers" varchar(255)[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orgs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"sid" varchar(255),
	"settings" jsonb,
	"default_program_registration_window_id" uuid,
	"stripe_account_id" varchar(255),
	CONSTRAINT "orgs_sid_uk" UNIQUE("sid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ott_auth_requests" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"ott" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment_methods" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"billing_address_id" uuid,
	"card_brand" varchar(255),
	"card_last_4" varchar(255),
	"name_on_card" varchar(255),
	"stripe_customer_id" varchar(255),
	"stripe_card_id" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"card_exp_month" integer,
	"card_exp_year" integer,
	"deleted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "post_images" (
	"id" uuid PRIMARY KEY NOT NULL,
	"post_id" uuid NOT NULL,
	"image_id" uuid NOT NULL,
	"order" integer DEFAULT 1,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "perms" (
	"name" varchar(255) PRIMARY KEY NOT NULL,
	"label" varchar(255),
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pq_org_tags" (
	"id" uuid PRIMARY KEY NOT NULL,
	"pq_id" uuid,
	"neg" boolean DEFAULT false NOT NULL,
	"op" varchar(255) DEFAULT 'EQ'::character varying NOT NULL,
	"org_tag_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pq_orgs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"pq_id" uuid,
	"neg" boolean DEFAULT false NOT NULL,
	"op" varchar(255) DEFAULT 'EQ'::character varying NOT NULL,
	"org_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pq_participant_price_cents" (
	"id" uuid PRIMARY KEY NOT NULL,
	"pq_id" uuid,
	"neg" boolean DEFAULT false NOT NULL,
	"op" varchar(255) DEFAULT 'EQ'::character varying NOT NULL,
	"price_cents_a" numeric,
	"price_cents_b" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pq_programs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"pq_id" uuid,
	"neg" boolean DEFAULT false NOT NULL,
	"op" varchar(255) DEFAULT 'EQ'::character varying NOT NULL,
	"program_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pq_start_times" (
	"id" uuid PRIMARY KEY NOT NULL,
	"pq_id" uuid,
	"neg" boolean DEFAULT false NOT NULL,
	"op" varchar(255) DEFAULT 'EQ'::character varying NOT NULL,
	"wall_time_a" time,
	"wall_time_b" time
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pro_shops" (
	"id" uuid PRIMARY KEY NOT NULL,
	"pro_page_id" uuid NOT NULL,
	"name" text,
	"description" text,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "pro_shops_pro_page_id_key" UNIQUE("pro_page_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pq_types" (
	"id" uuid PRIMARY KEY NOT NULL,
	"pq_id" uuid,
	"neg" boolean DEFAULT false NOT NULL,
	"op" varchar(255) DEFAULT 'EQ'::character varying NOT NULL,
	"type" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pq_venues" (
	"id" uuid PRIMARY KEY NOT NULL,
	"pq_id" uuid,
	"neg" boolean DEFAULT false NOT NULL,
	"op" varchar(255) DEFAULT 'EQ'::character varying NOT NULL,
	"venue_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pro_page_images" (
	"pro_page_id" uuid,
	"asset_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pro_pages" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"description" text,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"url" text,
	CONSTRAINT "pro_pages_user_id_key" UNIQUE("user_id"),
	CONSTRAINT "pro_pages_url_uk" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pro_shop_item_images" (
	"asset_id" uuid,
	"pro_shop_item_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_images" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_id" uuid,
	"image_id" uuid,
	"order" integer,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pq_names" (
	"id" uuid PRIMARY KEY NOT NULL,
	"pq_id" uuid,
	"neg" boolean DEFAULT false NOT NULL,
	"op" varchar(255) DEFAULT 'EQ'::character varying NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_variants" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_id" uuid,
	"name" varchar(255),
	"description" text,
	"price_cents" numeric,
	"stock_type" varchar(255),
	"shipping_required" boolean,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"content" text,
	"deleted" boolean DEFAULT false,
	"pinned" boolean DEFAULT false,
	"is_admin_post" boolean DEFAULT false,
	"creator_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"org_id" uuid,
	"name" varchar(255),
	"description" text,
	"price_cents" numeric,
	"stock_type" varchar(255),
	"shipping_required" boolean,
	"creator_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"type" varchar(255) DEFAULT 'ONSITE'::character varying NOT NULL,
	"offsite_url" varchar(255),
	"offsite_cta" varchar(255),
	"walmart_item_id" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pq_start_dates" (
	"id" uuid PRIMARY KEY NOT NULL,
	"pq_id" uuid,
	"neg" boolean DEFAULT false NOT NULL,
	"op" varchar(255) DEFAULT 'EQ'::character varying NOT NULL,
	"date_a" date,
	"date_b" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pro_shop_items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"pro_shop_id" uuid NOT NULL,
	"name" text,
	"description" text,
	"link" text,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_variant_images" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_variant_id" uuid,
	"image_id" uuid,
	"order" integer,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_variant_option_values" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_variant_id" uuid,
	"variant_option_value_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_variant_stock" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_variant_id" uuid,
	"quantity" integer,
	"type" varchar(255),
	"note" text,
	"creator_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"order_item_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "programs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"date" date,
	"start_time" varchar(255),
	"end_time" varchar(255),
	"max_participants" integer,
	"participant_price_cents" numeric,
	"cancellation_policy" varchar(255),
	"publish_date" date,
	"draft" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"org_id" uuid,
	"type" varchar(255),
	"subtype" varchar(255),
	"pricing_type" varchar(255),
	"hidden" boolean DEFAULT false,
	"host_id" uuid,
	"info" jsonb,
	"read_before_booking" text,
	"min_participants" integer DEFAULT 0,
	"creator_id" uuid,
	"tz" varchar,
	"club_membership_requirement" varchar(255),
	"settings" jsonb,
	"allowed_booking_card_brand" varchar(255),
	"venue_id" uuid,
	"status" varchar(255) DEFAULT 'OK'::character varying NOT NULL,
	"canceled_at" timestamp with time zone,
	"canceled_note" text,
	"canceler_id" uuid,
	"sports" varchar(255)[],
	"default_registration_window_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_internal_tags" (
	"id" uuid PRIMARY KEY NOT NULL,
	"program_id" uuid,
	"internal_tag_id" uuid,
	"creator_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_package_items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"query_id" uuid,
	"program_package_id" uuid,
	"quantity" integer,
	"description" varchar(255) NOT NULL,
	"type" varchar(255),
	"beneficiary_group_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_packages" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"name" varchar(255) NOT NULL,
	"order" integer NOT NULL,
	"description" text,
	"price_cents" numeric NOT NULL,
	"redemption_term_days" integer,
	"redemption_date_start" date,
	"redemption_date_end" date,
	"expiration_date" date,
	"purchase_status" varchar(255) DEFAULT 'PURCHASABLE'::character varying,
	"set_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_posts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"program_id" uuid NOT NULL,
	"post_id" uuid NOT NULL,
	"createdAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_package_sets" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"venue_id" uuid,
	"org_id" uuid,
	"name" varchar(255) NOT NULL,
	"visibility" varchar(255) DEFAULT 'VISIBLE'::character varying,
	"description" text,
	"expiration_date" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promo_code_programs" (
	"promo_code_id" uuid NOT NULL,
	"program_id" uuid NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_queries" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_attribute_settings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"attribute_id" uuid,
	"required" boolean DEFAULT false,
	"search_filterable" boolean DEFAULT false,
	"pro_search_filterable" boolean DEFAULT false,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_bookings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"status" varchar(255),
	"note" text,
	"program_id" uuid NOT NULL,
	"participant_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"invoice_id" uuid,
	"checkedin_at" timestamp with time zone,
	"checkedin_by" uuid,
	"purchaser_id" uuid NOT NULL,
	"participant_first_name" text,
	"participant_last_name" text,
	"participant_email" text,
	"participant_phone_number" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promo_codes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"code" varchar(255),
	"note" text,
	"valid_from" timestamp with time zone,
	"valid_to" timestamp with time zone,
	"discount_cents" numeric,
	"max_total_uses" integer,
	"max_user_uses" integer DEFAULT 1,
	"first_purchase_only" boolean,
	"entire_invoice_applicable" boolean DEFAULT false,
	"active" boolean DEFAULT true,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"discount_percent" numeric,
	CONSTRAINT "promo_codes_code_key" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_attributes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"program_id" uuid,
	"attribute_id" uuid,
	"attribute_value_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_images" (
	"id" uuid PRIMARY KEY NOT NULL,
	"program_id" uuid,
	"image_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"order" integer,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_inclusions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"program_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_locations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"public_description" text,
	"program_id" uuid,
	"location_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"show_full_address" boolean DEFAULT false,
	"booked_description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"program_id" uuid,
	"product_id" uuid,
	"order" integer,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_required_club_memberships" (
	"id" uuid PRIMARY KEY NOT NULL,
	"program_id" uuid,
	"club_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_tags" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"creator_id" uuid,
	"program_id" uuid,
	"tag_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_waitlist_users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"program_id" uuid,
	"user_id" uuid,
	"notes" text,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promo_code_skus" (
	"id" uuid PRIMARY KEY NOT NULL,
	"sku" varchar(255),
	"promo_code_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promo_code_users" (
	"promo_code_id" uuid NOT NULL,
	"user_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promo_code_uses" (
	"id" uuid PRIMARY KEY NOT NULL,
	"promo_code_id" uuid NOT NULL,
	"user_id" uuid,
	"invoice_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "purchasable_permits" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"sku" varchar(255),
	"price_cents" numeric,
	"status" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz_submission_answers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"submission_id" uuid,
	"question_id" uuid,
	"answer_id" uuid,
	"question" text,
	"answer" text,
	"question_order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz_submissions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"quiz_id" uuid,
	"user_id" uuid,
	"quiz_name" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "refunds" (
	"id" uuid PRIMARY KEY NOT NULL,
	"amount_cents" numeric,
	"reason" text,
	"payment_id" uuid,
	"initiator_id" uuid,
	"stripe_refund_id" varchar(255),
	"stripe_payment_intent_id" varchar(255),
	"info" jsonb,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "res_finite_schedules" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"resource_id" uuid,
	"schedule_id" uuid,
	"date_start" date NOT NULL,
	"date_end" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shipping_addresses" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"recipient_name" varchar(255),
	"company_name" varchar(255),
	"line1" varchar(255),
	"line2" varchar(255),
	"postcode" varchar(255),
	"city" varchar(255),
	"state" varchar(255),
	"country" varchar(255),
	"phone_number" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "res_special_hours" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"resource_id" uuid,
	"date" date,
	"wall_start" time,
	"wall_end" time,
	"is_all_day" boolean,
	"is_closed" boolean,
	"hourly_price_cents" numeric,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "res_schedule_hours" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"schedule_id" uuid,
	"day_of_week" text,
	"wall_start" time,
	"wall_end" time,
	"hourly_price_cents" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "res_types" (
	"name" varchar(255) PRIMARY KEY NOT NULL,
	"label" text,
	"description" text,
	"category_name" text,
	"sport" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role_perms" (
	"id" uuid PRIMARY KEY NOT NULL,
	"role_id" uuid,
	"perm" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "res_reservations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"resource_id" uuid,
	"program_id" uuid,
	"date_start" date,
	"date_end" date,
	"wall_start" time,
	"wall_end" time,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saas_requests" (
	"id" uuid PRIMARY KEY NOT NULL,
	"info" jsonb,
	"requester_id" uuid,
	"club_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "searchable_programs" (
	"id" uuid,
	"date" date,
	"type" varchar(255),
	"name" varchar(255),
	"venue_id" uuid,
	"location_id" uuid,
	"state" varchar(255),
	"city" varchar(255),
	"attribute_id" uuid,
	"attribute_value_id" uuid,
	"host_id" uuid,
	"internal_tag_id" uuid,
	"internal_tag_btl_feature" varchar(255),
	"club_id" uuid,
	"image_id" uuid,
	"utc_start" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quizzes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"active" boolean DEFAULT true,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resources" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"venue_id" uuid,
	"name" text,
	"type" varchar(255),
	"min_capacity" integer,
	"max_capacity" integer,
	"notes" text,
	"schedule_id" uuid,
	"pricing_type" varchar(255),
	"base_hourly_price_cents" numeric,
	"default_availability_window_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz_questions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"quiz_id" uuid,
	"question" text,
	"order" integer,
	"active" boolean DEFAULT true,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "quiz_questions_quiz_id_question_uk" UNIQUE("quiz_id","question")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "res_schedules" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"creator_id" uuid,
	"venue_id" uuid,
	"name" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"system_code" varchar(255),
	"org_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_permits" (
	"id" uuid PRIMARY KEY NOT NULL,
	"permit_id" uuid,
	"permit_info" jsonb,
	"application_status" varchar(255),
	"payment_status" varchar(255),
	"scraper_status" varchar(255),
	"fulfillment_status" varchar(255),
	"scraper_started_date" timestamp with time zone,
	"manual_fulfillment_date" timestamp with time zone,
	"nyc_permit_confirmation_email_received" boolean DEFAULT false,
	"internal_notes" text,
	"nyc_permit_account_id" uuid,
	"nyc_permit_card_id" uuid,
	"invoice_id" uuid,
	"user_id" uuid,
	"app_first_name" varchar(255),
	"app_middle_initial" varchar(255),
	"app_last_name" varchar(255),
	"app_birthdate" date,
	"app_address_line_1" text,
	"app_address_line_2" text,
	"app_address_city" text,
	"app_address_state" text,
	"app_address_zipcode" text,
	"app_address_country" text,
	"app_phone_number" text,
	"app_idnyc_number" text,
	"app_permit_photo_id" uuid,
	"app_identification_photo_id" uuid,
	"app_idnyc_photo_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"manual_fulfiller_id" uuid,
	"app_email" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscription_provisions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"status" varchar(255),
	"subscription_id" uuid,
	"role_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscription_plans" (
	"id" uuid PRIMARY KEY NOT NULL,
	"system_code" varchar(255),
	"org_id" uuid,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"internal_notes" text,
	"status" varchar(255),
	"billing_interval" varchar(255),
	"price_cents" numeric,
	"trial_days" integer,
	"creator_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_interested_play_locations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"user_id" uuid,
	"google_place_id" varchar(255),
	"country" varchar(255),
	"region" varchar(255),
	"city" varchar(255),
	"lat" double precision,
	"lon" double precision,
	"info" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_package_item_beneficiary_group_uses" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"user_package_item_id" uuid,
	"beneficiary_group_user_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_program_packages" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"org_id" uuid,
	"venue_id" uuid,
	"program_package_id" uuid,
	"name" varchar(255) NOT NULL,
	"description" text,
	"price_cents" numeric NOT NULL,
	"redemption_term_days" integer,
	"redemption_date_start" date,
	"redemption_date_end" date,
	"status" varchar(255) DEFAULT 'ACTIVE'::character varying,
	"user_id" uuid,
	"purchaser_id" uuid,
	"canceler_id" uuid,
	"canceled_note" text,
	"canceled_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_password_resets" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "user_password_resets_user_id_uk" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "variant_option_values" (
	"id" uuid PRIMARY KEY NOT NULL,
	"variant_option_id" uuid,
	"name" varchar(255),
	"order" integer,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_settings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"app_notifications_enabled" boolean,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sponsors" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"notes" text,
	"org_id" uuid,
	"logo_id" uuid,
	"icon_id" uuid,
	"creator_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"link" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"number" varchar(255),
	"hash" varchar(255),
	"passwordToken" varchar(255),
	"passwordTokenCreatedDate" timestamp with time zone,
	"token" varchar(255),
	"type" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"firstName" varchar(255),
	"lastName" varchar(255),
	"stripe_customer_id" varchar(255),
	"player_level" varchar(255),
	"gender" varchar(255),
	"birthdate" timestamp with time zone,
	"location" text,
	"occupation" text,
	"profile_image_id" uuid,
	"sendbird_user_id" varchar(255),
	"eqx_member_id" text,
	"eqx_info" jsonb DEFAULT '{}'::jsonb,
	CONSTRAINT "users_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscription_invoices" (
	"id" uuid PRIMARY KEY NOT NULL,
	"subscription_id" uuid,
	"invoice_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscriptions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"plan_id" uuid,
	"subscriber_id" uuid,
	"payment_method_id" uuid NOT NULL,
	"internal_notes" text,
	"name" varchar(255),
	"description" varchar(255),
	"start" timestamp with time zone,
	"end" timestamp with time zone,
	"billing_interval" varchar(255),
	"next_bill_date" timestamp with time zone,
	"price_cents" numeric,
	"trial_end" timestamp with time zone,
	"status" varchar(255),
	"provisioned_status" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transfers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"org_id" uuid NOT NULL,
	"invoice_id" uuid NOT NULL,
	"stripe_transfer_id" varchar(255),
	"amount_transferred_cents" integer,
	"status" varchar(255),
	"info" json,
	"note" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_program_package_items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"query_id" uuid,
	"user_program_package_id" uuid,
	"quantity" integer,
	"description" varchar(255) NOT NULL,
	"type" varchar(255),
	"beneficiary_group_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_profile_attribute_settings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"attribute_id" uuid,
	"required" boolean DEFAULT false,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_profile_attributes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"attribute_id" uuid,
	"attribute_value_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_program_package_item_uses" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"user_package_item_id" uuid,
	"booking_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_roles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"role_id" uuid,
	"creator_id" uuid,
	"src" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_sessions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"session_id" uuid,
	"data" jsonb,
	"ip_address" varchar(255),
	"user_agent" varchar(255),
	"last_href" text,
	"last_seen" timestamp with time zone NOT NULL,
	"createdAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "variant_options" (
	"id" uuid PRIMARY KEY NOT NULL,
	"org_id" uuid,
	"name" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "venue_homepage_faqs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"homepage_id" uuid,
	"name" text,
	"description" text,
	"order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "venue_images" (
	"id" uuid PRIMARY KEY NOT NULL,
	"venue_id" uuid,
	"image_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"order" integer,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "venue_lesson_requests" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"venue_id" uuid,
	"customer_id" uuid,
	"lesson_request_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "venue_team_members" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"venue_id" uuid,
	"user_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "windows" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"name" varchar(255),
	"date_start" date,
	"date_end" date,
	"wall_start" time,
	"wall_end" time,
	"type" varchar(255) NOT NULL,
	"rel_unit_end" varchar(255),
	"rel_value_end" integer,
	"rel_unit_start" varchar(255),
	"rel_value_start" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "venue_available_lessons" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"venue_id" uuid,
	"sport" varchar(255),
	"notify_emails" varchar(255)[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "venue_customers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"org_customer_id" uuid,
	"venue_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "venue_homepages" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"creator_id" uuid,
	"title" text,
	"description" text,
	"faq_section_title" text,
	"settings" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "venue_open_hours" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"venue_id" uuid,
	"day_of_week" text,
	"wall_start" time,
	"wall_end" time
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "asset_delete_queue" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"asset_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"org_id" uuid,
	"user_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_tags" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"org_id" uuid,
	"creator_id" uuid,
	"name" varchar(255) NOT NULL,
	"label" varchar(255),
	"color" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "venues" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"sid" text,
	"name" text,
	"org_id" uuid,
	"address_id" uuid,
	"phone_number" text,
	"email" text,
	"tz" text,
	"homepage_id" uuid,
	"settings" jsonb,
	"bookability" varchar(255),
	"official_website_url" varchar(255),
	"default_res_availability_window_id" uuid,
	"default_program_registration_window_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cec_emails" (
	"id" uuid PRIMARY KEY NOT NULL,
	"cec_id" uuid,
	"email" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pq_start_dows" (
	"id" uuid PRIMARY KEY NOT NULL,
	"pq_id" uuid,
	"neg" boolean DEFAULT false NOT NULL,
	"op" varchar(255) DEFAULT 'EQ'::character varying NOT NULL,
	"dow" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_sponsors" (
	"id" uuid PRIMARY KEY NOT NULL,
	"program_id" uuid,
	"sponsor_id" uuid,
	"order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz_answers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"question_id" uuid,
	"answer" text,
	"order" integer,
	"active" boolean DEFAULT true,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "quiz_answers_question_id_answer_uk" UNIQUE("question_id","answer")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscription_plan_provisions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"plan_id" uuid,
	"role_id" uuid,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "venue_homepage_callouts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"homepage_id" uuid,
	"title" varchar(255) NOT NULL,
	"order" integer NOT NULL,
	"url" varchar(255),
	"image_id" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "beneficiary_group_verification_emails" ADD CONSTRAINT "beneficiary_group_verification_emails_beneficiary_group_id_fkey" FOREIGN KEY ("beneficiary_group_id") REFERENCES "public"."beneficiary_groups"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_bookings" ADD CONSTRAINT "benefit_bookings_beneficiary_group_id_fkey" FOREIGN KEY ("beneficiary_group_id") REFERENCES "public"."beneficiary_groups"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_bookings" ADD CONSTRAINT "benefit_bookings_beneficiary_id_fkey" FOREIGN KEY ("beneficiary_id") REFERENCES "public"."beneficiaries"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_bookings" ADD CONSTRAINT "benefit_bookings_benefit_id_fkey" FOREIGN KEY ("benefit_id") REFERENCES "public"."benefits"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_bookings" ADD CONSTRAINT "benefit_bookings_program_booking_id_fkey" FOREIGN KEY ("program_booking_id") REFERENCES "public"."program_bookings"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "beneficiaries" ADD CONSTRAINT "beneficiaries_benefit_id_fkey" FOREIGN KEY ("benefit_id") REFERENCES "public"."benefits"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "beneficiaries" ADD CONSTRAINT "beneficiaries_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "beneficiary_group_exclusive_blocks" ADD CONSTRAINT "beneficiary_group_exclusive_blocks_beneficiary_group_id_fkey" FOREIGN KEY ("beneficiary_group_id") REFERENCES "public"."beneficiary_groups"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "beneficiary_group_exclusive_blocks" ADD CONSTRAINT "beneficiary_group_exclusive_blocks_benefit_block_id_fkey" FOREIGN KEY ("benefit_block_id") REFERENCES "public"."benefit_blocks"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "beneficiary_group_exclusive_programs" ADD CONSTRAINT "beneficiary_group_exclusive_programs_beneficiary_group_id_fkey" FOREIGN KEY ("beneficiary_group_id") REFERENCES "public"."beneficiary_groups"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "beneficiary_group_exclusive_programs" ADD CONSTRAINT "beneficiary_group_exclusive_programs_benefit_program_id_fkey" FOREIGN KEY ("benefit_program_id") REFERENCES "public"."benefit_programs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_faqs" ADD CONSTRAINT "benefit_faqs_benefit_id_fkey" FOREIGN KEY ("benefit_id") REFERENCES "public"."benefits"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "beneficiary_group_users" ADD CONSTRAINT "beneficiary_group_users_beneficiary_group_id_fkey" FOREIGN KEY ("beneficiary_group_id") REFERENCES "public"."beneficiary_groups"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "beneficiary_group_users" ADD CONSTRAINT "beneficiary_group_users_beneficiary_id_fkey" FOREIGN KEY ("beneficiary_id") REFERENCES "public"."beneficiaries"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assets" ADD CONSTRAINT "assets_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attribute_values" ADD CONSTRAINT "attribute_values_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "beneficiary_groups" ADD CONSTRAINT "beneficiary_groups_benefit_id_fkey" FOREIGN KEY ("benefit_id") REFERENCES "public"."benefits"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "beneficiary_group_caps" ADD CONSTRAINT "beneficiary_group_caps_beneficiary_group_id_fkey" FOREIGN KEY ("beneficiary_group_id") REFERENCES "public"."beneficiary_groups"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "beneficiary_group_caps" ADD CONSTRAINT "beneficiary_group_caps_cap_id_fkey" FOREIGN KEY ("cap_id") REFERENCES "public"."caps"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_blocks" ADD CONSTRAINT "benefit_blocks_benefit_venue_id_fkey" FOREIGN KEY ("benefit_venue_id") REFERENCES "public"."benefit_venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_blocks" ADD CONSTRAINT "benefit_blocks_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_programs" ADD CONSTRAINT "benefit_programs_benefit_id_fkey" FOREIGN KEY ("benefit_id") REFERENCES "public"."benefits"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_programs" ADD CONSTRAINT "benefit_programs_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_venue_faqs" ADD CONSTRAINT "benefit_venue_faqs_benefit_venue_id_fkey" FOREIGN KEY ("benefit_venue_id") REFERENCES "public"."benefit_venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_venues" ADD CONSTRAINT "benefit_venues_benefit_id_fkey" FOREIGN KEY ("benefit_id") REFERENCES "public"."benefits"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_venues" ADD CONSTRAINT "benefit_venues_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefits" ADD CONSTRAINT "benefits_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefits" ADD CONSTRAINT "benefits_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_venue_permitted_beneficiary_groups" ADD CONSTRAINT "benefit_venue_permitted_beneficiary_g_beneficiary_group_id_fkey" FOREIGN KEY ("beneficiary_group_id") REFERENCES "public"."beneficiary_groups"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_venue_permitted_beneficiary_groups" ADD CONSTRAINT "benefit_venue_permitted_beneficiary_group_benefit_venue_id_fkey" FOREIGN KEY ("benefit_venue_id") REFERENCES "public"."benefit_venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_venue_permitted_resources" ADD CONSTRAINT "benefit_venue_permitted_resources_benefit_venue_id_fkey" FOREIGN KEY ("benefit_venue_id") REFERENCES "public"."benefit_venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_venue_permitted_resources" ADD CONSTRAINT "benefit_venue_permitted_resources_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_venue_tags" ADD CONSTRAINT "benefit_venue_tags_benefit_venue_id_fkey" FOREIGN KEY ("benefit_venue_id") REFERENCES "public"."benefit_venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_venue_tags" ADD CONSTRAINT "benefit_venue_tags_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "benefit_venue_tags" ADD CONSTRAINT "benefit_venue_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."org_tags"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blocked_users" ADD CONSTRAINT "blocked_users_blocked_user_id_fkey" FOREIGN KEY ("blocked_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blocked_users" ADD CONSTRAINT "blocked_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "btl_featured_facilities" ADD CONSTRAINT "btl_featured_facilities_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "btl_featured_facilities" ADD CONSTRAINT "btl_featured_facilities_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "btl_featured_geos" ADD CONSTRAINT "btl_featured_geos_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "btl_org" ADD CONSTRAINT "btl_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_attribute_settings" ADD CONSTRAINT "club_attribute_settings_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_locations" ADD CONSTRAINT "club_locations_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_locations" ADD CONSTRAINT "club_locations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "connect_invites" ADD CONSTRAINT "connect_invites_invitee_id_fkey" FOREIGN KEY ("invitee_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "connect_invites" ADD CONSTRAINT "connect_invites_inviter_id_fkey" FOREIGN KEY ("inviter_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "custom_landing_pages" ADD CONSTRAINT "custom_landing_pages_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "custom_landing_pages" ADD CONSTRAINT "custom_landing_pages_internal_tag_id_fkey" FOREIGN KEY ("internal_tag_id") REFERENCES "public"."internal_tags"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "explore_clubs_positions" ADD CONSTRAINT "explore_clubs_positions_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cecs" ADD CONSTRAINT "cecs_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cecs" ADD CONSTRAINT "cecs_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_attributes" ADD CONSTRAINT "club_attributes_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_attributes" ADD CONSTRAINT "club_attributes_attribute_value_id_fkey" FOREIGN KEY ("attribute_value_id") REFERENCES "public"."attribute_values"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_attributes" ADD CONSTRAINT "club_attributes_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clubs" ADD CONSTRAINT "clubs_benefit_id_fkey" FOREIGN KEY ("benefit_id") REFERENCES "public"."benefits"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clubs" ADD CONSTRAINT "clubs_cover_id_fkey" FOREIGN KEY ("cover_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clubs" ADD CONSTRAINT "clubs_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clubs" ADD CONSTRAINT "clubs_icon_id_fkey" FOREIGN KEY ("icon_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clubs" ADD CONSTRAINT "clubs_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clubs" ADD CONSTRAINT "clubs_program_query_id_fkey" FOREIGN KEY ("program_query_id") REFERENCES "public"."program_queries"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_members" ADD CONSTRAINT "club_members_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_members" ADD CONSTRAINT "club_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_posts" ADD CONSTRAINT "club_posts_club_id_fkey1" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_posts" ADD CONSTRAINT "club_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_products" ADD CONSTRAINT "club_products_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_products" ADD CONSTRAINT "club_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_programs" ADD CONSTRAINT "club_programs_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_programs" ADD CONSTRAINT "club_programs_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_sponsors" ADD CONSTRAINT "club_sponsors_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_sponsors" ADD CONSTRAINT "club_sponsors_sponsor_id_fkey" FOREIGN KEY ("sponsor_id") REFERENCES "public"."sponsors"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_venues" ADD CONSTRAINT "club_venues_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_venues" ADD CONSTRAINT "club_venues_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_videos" ADD CONSTRAINT "club_videos_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_video_products" ADD CONSTRAINT "club_video_products_club_video_id_fkey" FOREIGN KEY ("club_video_id") REFERENCES "public"."club_videos"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "club_video_products" ADD CONSTRAINT "club_video_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fee_rules" ADD CONSTRAINT "fee_rules_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fee_rules" ADD CONSTRAINT "fee_rules_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoices" ADD CONSTRAINT "invoices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lesson_requests" ADD CONSTRAINT "lesson_requests_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "line_items" ADD CONSTRAINT "line_items_benefit_id_fkey" FOREIGN KEY ("benefit_id") REFERENCES "public"."benefits"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "line_items" ADD CONSTRAINT "line_items_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "line_items" ADD CONSTRAINT "line_items_promo_code_id_fkey" FOREIGN KEY ("promo_code_id") REFERENCES "public"."promo_codes"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nyc_permit_accounts" ADD CONSTRAINT "nyc_permit_accounts_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "internal_tags" ADD CONSTRAINT "internal_tags_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nyc_permit_cards" ADD CONSTRAINT "nyc_permit_cards_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_line_item_id_fkey" FOREIGN KEY ("line_item_id") REFERENCES "public"."line_items"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_program_booking_id_fkey" FOREIGN KEY ("program_booking_id") REFERENCES "public"."program_bookings"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_res_reservation_id_fkey" FOREIGN KEY ("res_reservation_id") REFERENCES "public"."res_reservations"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_user_permit_id_fkey" FOREIGN KEY ("user_permit_id") REFERENCES "public"."user_permits"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_user_program_package_id_fkey" FOREIGN KEY ("user_program_package_id") REFERENCES "public"."user_program_packages"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_shipping_address_id_fkey" FOREIGN KEY ("shipping_address_id") REFERENCES "public"."shipping_addresses"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_members" ADD CONSTRAINT "org_members_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_members" ADD CONSTRAINT "org_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "locations" ADD CONSTRAINT "locations_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "public"."payment_methods"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "player_profile_quiz" ADD CONSTRAINT "player_profile_quiz_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orgs" ADD CONSTRAINT "orgs_default_program_registration_window_id_fkey" FOREIGN KEY ("default_program_registration_window_id") REFERENCES "public"."windows"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ott_auth_requests" ADD CONSTRAINT "ott_auth_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_billing_address_id_fkey" FOREIGN KEY ("billing_address_id") REFERENCES "public"."addresses"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_images" ADD CONSTRAINT "post_images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_images" ADD CONSTRAINT "post_images_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pq_org_tags" ADD CONSTRAINT "pq_org_tags_org_tag_id_fkey" FOREIGN KEY ("org_tag_id") REFERENCES "public"."org_tags"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pq_org_tags" ADD CONSTRAINT "pq_org_tags_pq_id_fkey" FOREIGN KEY ("pq_id") REFERENCES "public"."program_queries"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pq_orgs" ADD CONSTRAINT "pq_orgs_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pq_orgs" ADD CONSTRAINT "pq_orgs_pq_id_fkey" FOREIGN KEY ("pq_id") REFERENCES "public"."program_queries"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pq_participant_price_cents" ADD CONSTRAINT "pq_participant_price_cents_pq_id_fkey" FOREIGN KEY ("pq_id") REFERENCES "public"."program_queries"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pq_programs" ADD CONSTRAINT "pq_programs_pq_id_fkey" FOREIGN KEY ("pq_id") REFERENCES "public"."program_queries"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pq_programs" ADD CONSTRAINT "pq_programs_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pq_start_times" ADD CONSTRAINT "pq_start_times_pq_id_fkey" FOREIGN KEY ("pq_id") REFERENCES "public"."program_queries"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pro_shops" ADD CONSTRAINT "pro_shops_pro_page_id_fkey" FOREIGN KEY ("pro_page_id") REFERENCES "public"."pro_pages"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pq_types" ADD CONSTRAINT "pq_types_pq_id_fkey" FOREIGN KEY ("pq_id") REFERENCES "public"."program_queries"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pq_venues" ADD CONSTRAINT "pq_venues_pq_id_fkey" FOREIGN KEY ("pq_id") REFERENCES "public"."program_queries"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pq_venues" ADD CONSTRAINT "pq_venues_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pro_page_images" ADD CONSTRAINT "pro_page_images_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pro_page_images" ADD CONSTRAINT "pro_page_images_pro_page_id_fkey" FOREIGN KEY ("pro_page_id") REFERENCES "public"."pro_pages"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pro_pages" ADD CONSTRAINT "pro_pages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pro_shop_item_images" ADD CONSTRAINT "pro_shop_item_images_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pro_shop_item_images" ADD CONSTRAINT "pro_shop_item_images_pro_shop_item_id_fkey" FOREIGN KEY ("pro_shop_item_id") REFERENCES "public"."pro_shop_items"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_images" ADD CONSTRAINT "product_images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pq_names" ADD CONSTRAINT "pq_names_pq_id_fkey" FOREIGN KEY ("pq_id") REFERENCES "public"."program_queries"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pq_start_dates" ADD CONSTRAINT "pq_start_dates_pq_id_fkey" FOREIGN KEY ("pq_id") REFERENCES "public"."program_queries"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pro_shop_items" ADD CONSTRAINT "pro_shop_items_pro_shop_id_fkey" FOREIGN KEY ("pro_shop_id") REFERENCES "public"."pro_shops"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_variant_images" ADD CONSTRAINT "product_variant_images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_variant_images" ADD CONSTRAINT "product_variant_images_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_variant_option_values" ADD CONSTRAINT "product_variant_option_values_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_variant_option_values" ADD CONSTRAINT "product_variant_option_values_variant_option_value_id_fkey" FOREIGN KEY ("variant_option_value_id") REFERENCES "public"."variant_option_values"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_variant_stock" ADD CONSTRAINT "product_variant_stock_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_variant_stock" ADD CONSTRAINT "product_variant_stock_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "public"."order_items"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_variant_stock" ADD CONSTRAINT "product_variant_stock_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "programs" ADD CONSTRAINT "programs_canceler_id_fkey" FOREIGN KEY ("canceler_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "programs" ADD CONSTRAINT "programs_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "programs" ADD CONSTRAINT "programs_default_registration_window_id_fkey" FOREIGN KEY ("default_registration_window_id") REFERENCES "public"."windows"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "programs" ADD CONSTRAINT "programs_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "programs" ADD CONSTRAINT "programs_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "programs" ADD CONSTRAINT "programs_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_internal_tags" ADD CONSTRAINT "program_internal_tags_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_internal_tags" ADD CONSTRAINT "program_internal_tags_internal_tag_id_fkey" FOREIGN KEY ("internal_tag_id") REFERENCES "public"."internal_tags"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_internal_tags" ADD CONSTRAINT "program_internal_tags_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_package_items" ADD CONSTRAINT "program_package_items_beneficiary_group_id_fkey" FOREIGN KEY ("beneficiary_group_id") REFERENCES "public"."beneficiary_groups"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_package_items" ADD CONSTRAINT "program_package_items_program_package_id_fkey" FOREIGN KEY ("program_package_id") REFERENCES "public"."program_packages"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_package_items" ADD CONSTRAINT "program_package_items_query_id_fkey" FOREIGN KEY ("query_id") REFERENCES "public"."program_queries"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_packages" ADD CONSTRAINT "program_packages_set_id_fkey" FOREIGN KEY ("set_id") REFERENCES "public"."program_package_sets"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_posts" ADD CONSTRAINT "program_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_posts" ADD CONSTRAINT "program_posts_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_package_sets" ADD CONSTRAINT "program_package_sets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_package_sets" ADD CONSTRAINT "program_package_sets_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promo_code_programs" ADD CONSTRAINT "promo_code_programs_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promo_code_programs" ADD CONSTRAINT "promo_code_programs_promo_code_id_fkey" FOREIGN KEY ("promo_code_id") REFERENCES "public"."promo_codes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_attribute_settings" ADD CONSTRAINT "program_attribute_settings_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_bookings" ADD CONSTRAINT "program_bookings_checkedin_by_fkey" FOREIGN KEY ("checkedin_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_bookings" ADD CONSTRAINT "program_bookings_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_bookings" ADD CONSTRAINT "program_bookings_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_bookings" ADD CONSTRAINT "program_bookings_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_bookings" ADD CONSTRAINT "program_bookings_purchaser_id_fkey" FOREIGN KEY ("purchaser_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_attributes" ADD CONSTRAINT "program_attributes_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_attributes" ADD CONSTRAINT "program_attributes_attribute_value_id_fkey" FOREIGN KEY ("attribute_value_id") REFERENCES "public"."attribute_values"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_attributes" ADD CONSTRAINT "program_attributes_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_images" ADD CONSTRAINT "program_images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_images" ADD CONSTRAINT "program_images_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_inclusions" ADD CONSTRAINT "program_inclusions_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_locations" ADD CONSTRAINT "program_locations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_locations" ADD CONSTRAINT "program_locations_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_products" ADD CONSTRAINT "program_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_products" ADD CONSTRAINT "program_products_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_required_club_memberships" ADD CONSTRAINT "program_required_club_memberships_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_required_club_memberships" ADD CONSTRAINT "program_required_club_memberships_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_tags" ADD CONSTRAINT "program_tags_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_tags" ADD CONSTRAINT "program_tags_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_tags" ADD CONSTRAINT "program_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."org_tags"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_waitlist_users" ADD CONSTRAINT "program_waitlist_users_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_waitlist_users" ADD CONSTRAINT "program_waitlist_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promo_code_skus" ADD CONSTRAINT "promo_code_skus_promo_code_id_fkey" FOREIGN KEY ("promo_code_id") REFERENCES "public"."promo_codes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promo_code_users" ADD CONSTRAINT "promo_code_users_promo_code_id_fkey" FOREIGN KEY ("promo_code_id") REFERENCES "public"."promo_codes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promo_code_users" ADD CONSTRAINT "promo_code_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promo_code_uses" ADD CONSTRAINT "promo_code_uses_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promo_code_uses" ADD CONSTRAINT "promo_code_uses_promo_code_id_fkey" FOREIGN KEY ("promo_code_id") REFERENCES "public"."promo_codes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promo_code_uses" ADD CONSTRAINT "promo_code_uses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_submission_answers" ADD CONSTRAINT "quiz_submission_answers_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "public"."quiz_answers"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_submission_answers" ADD CONSTRAINT "quiz_submission_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."quiz_questions"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_submission_answers" ADD CONSTRAINT "quiz_submission_answers_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "public"."quiz_submissions"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_submissions" ADD CONSTRAINT "quiz_submissions_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_submissions" ADD CONSTRAINT "quiz_submissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "refunds" ADD CONSTRAINT "refunds_initiator_id_fkey" FOREIGN KEY ("initiator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "refunds" ADD CONSTRAINT "refunds_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "res_finite_schedules" ADD CONSTRAINT "res_finite_schedules_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "res_finite_schedules" ADD CONSTRAINT "res_finite_schedules_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "public"."res_schedules"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shipping_addresses" ADD CONSTRAINT "shipping_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "res_special_hours" ADD CONSTRAINT "res_special_hours_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "res_schedule_hours" ADD CONSTRAINT "res_schedule_hours_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "public"."res_schedules"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "role_perms" ADD CONSTRAINT "role_perms_perm_fkey" FOREIGN KEY ("perm") REFERENCES "public"."perms"("name") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "role_perms" ADD CONSTRAINT "role_perms_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "res_reservations" ADD CONSTRAINT "res_reservations_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "res_reservations" ADD CONSTRAINT "res_reservations_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saas_requests" ADD CONSTRAINT "saas_requests_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saas_requests" ADD CONSTRAINT "saas_requests_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resources" ADD CONSTRAINT "resources_default_availability_window_id_fkey" FOREIGN KEY ("default_availability_window_id") REFERENCES "public"."windows"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resources" ADD CONSTRAINT "resources_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "public"."res_schedules"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resources" ADD CONSTRAINT "resources_type_fkey" FOREIGN KEY ("type") REFERENCES "public"."res_types"("name") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resources" ADD CONSTRAINT "resources_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "res_schedules" ADD CONSTRAINT "res_schedules_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "res_schedules" ADD CONSTRAINT "res_schedules_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roles" ADD CONSTRAINT "roles_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_permits" ADD CONSTRAINT "user_permits_app_identification_photo_id_fkey" FOREIGN KEY ("app_identification_photo_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_permits" ADD CONSTRAINT "user_permits_app_idnyc_photo_id_fkey" FOREIGN KEY ("app_idnyc_photo_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_permits" ADD CONSTRAINT "user_permits_app_permit_photo_id_fkey" FOREIGN KEY ("app_permit_photo_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_permits" ADD CONSTRAINT "user_permits_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_permits" ADD CONSTRAINT "user_permits_manual_fulfiller_id_fkey" FOREIGN KEY ("manual_fulfiller_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_permits" ADD CONSTRAINT "user_permits_nyc_permit_account_id_fkey" FOREIGN KEY ("nyc_permit_account_id") REFERENCES "public"."nyc_permit_accounts"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_permits" ADD CONSTRAINT "user_permits_nyc_permit_card_id_fkey" FOREIGN KEY ("nyc_permit_card_id") REFERENCES "public"."nyc_permit_cards"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_permits" ADD CONSTRAINT "user_permits_permit_id_fkey" FOREIGN KEY ("permit_id") REFERENCES "public"."purchasable_permits"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_permits" ADD CONSTRAINT "user_permits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscription_provisions" ADD CONSTRAINT "subscription_provisions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscription_provisions" ADD CONSTRAINT "subscription_provisions_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscription_plans" ADD CONSTRAINT "subscription_plans_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscription_plans" ADD CONSTRAINT "subscription_plans_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_interested_play_locations" ADD CONSTRAINT "user_interested_play_locations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_package_item_beneficiary_group_uses" ADD CONSTRAINT "user_package_item_beneficiary_gr_beneficiary_group_user_id_fkey" FOREIGN KEY ("beneficiary_group_user_id") REFERENCES "public"."beneficiary_group_users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_package_item_beneficiary_group_uses" ADD CONSTRAINT "user_package_item_beneficiary_group_u_user_package_item_id_fkey" FOREIGN KEY ("user_package_item_id") REFERENCES "public"."user_program_package_items"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_program_packages" ADD CONSTRAINT "user_program_packages_canceler_id_fkey" FOREIGN KEY ("canceler_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_program_packages" ADD CONSTRAINT "user_program_packages_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_program_packages" ADD CONSTRAINT "user_program_packages_program_package_id_fkey" FOREIGN KEY ("program_package_id") REFERENCES "public"."program_packages"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_program_packages" ADD CONSTRAINT "user_program_packages_purchaser_id_fkey" FOREIGN KEY ("purchaser_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_program_packages" ADD CONSTRAINT "user_program_packages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_program_packages" ADD CONSTRAINT "user_program_packages_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_password_resets" ADD CONSTRAINT "user_password_resets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "variant_option_values" ADD CONSTRAINT "variant_option_values_variant_option_id_fkey" FOREIGN KEY ("variant_option_id") REFERENCES "public"."variant_options"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sponsors" ADD CONSTRAINT "sponsors_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sponsors" ADD CONSTRAINT "sponsors_icon_id_fkey" FOREIGN KEY ("icon_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sponsors" ADD CONSTRAINT "sponsors_logo_id_fkey" FOREIGN KEY ("logo_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sponsors" ADD CONSTRAINT "sponsors_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_profile_image_id_fkey" FOREIGN KEY ("profile_image_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscription_invoices" ADD CONSTRAINT "subscription_invoices_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscription_invoices" ADD CONSTRAINT "subscription_invoices_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "public"."payment_methods"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "public"."subscription_plans"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_subscriber_id_fkey" FOREIGN KEY ("subscriber_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transfers" ADD CONSTRAINT "transfers_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transfers" ADD CONSTRAINT "transfers_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_program_package_items" ADD CONSTRAINT "user_program_package_items_beneficiary_group_id_fkey" FOREIGN KEY ("beneficiary_group_id") REFERENCES "public"."beneficiary_groups"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_program_package_items" ADD CONSTRAINT "user_program_package_items_query_id_fkey" FOREIGN KEY ("query_id") REFERENCES "public"."program_queries"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_program_package_items" ADD CONSTRAINT "user_program_package_items_user_program_package_id_fkey" FOREIGN KEY ("user_program_package_id") REFERENCES "public"."user_program_packages"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profile_attribute_settings" ADD CONSTRAINT "user_profile_attribute_settings_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profile_attributes" ADD CONSTRAINT "user_profile_attributes_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profile_attributes" ADD CONSTRAINT "user_profile_attributes_attribute_value_id_fkey" FOREIGN KEY ("attribute_value_id") REFERENCES "public"."attribute_values"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profile_attributes" ADD CONSTRAINT "user_profile_attributes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_program_package_item_uses" ADD CONSTRAINT "user_program_package_item_uses_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."program_bookings"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_program_package_item_uses" ADD CONSTRAINT "user_program_package_item_uses_user_item_id_fkey" FOREIGN KEY ("user_package_item_id") REFERENCES "public"."user_program_package_items"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "variant_options" ADD CONSTRAINT "variant_options_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_homepage_faqs" ADD CONSTRAINT "venue_homepage_faqs_homepage_id_fkey" FOREIGN KEY ("homepage_id") REFERENCES "public"."venue_homepages"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_images" ADD CONSTRAINT "venue_images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_images" ADD CONSTRAINT "venue_images_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_lesson_requests" ADD CONSTRAINT "venue_lesson_requests_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."venue_customers"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_lesson_requests" ADD CONSTRAINT "venue_lesson_requests_lesson_request_id_fkey" FOREIGN KEY ("lesson_request_id") REFERENCES "public"."lesson_requests"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_lesson_requests" ADD CONSTRAINT "venue_lesson_requests_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_team_members" ADD CONSTRAINT "venue_team_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_team_members" ADD CONSTRAINT "venue_team_members_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_available_lessons" ADD CONSTRAINT "venue_available_lessons_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_customers" ADD CONSTRAINT "venue_customers_org_customer_id_fkey" FOREIGN KEY ("org_customer_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_customers" ADD CONSTRAINT "venue_customers_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_homepages" ADD CONSTRAINT "venue_homepages_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_open_hours" ADD CONSTRAINT "venue_open_hours_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset_delete_queue" ADD CONSTRAINT "asset_delete_queue_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customers" ADD CONSTRAINT "customers_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customers" ADD CONSTRAINT "customers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_tags" ADD CONSTRAINT "org_tags_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_tags" ADD CONSTRAINT "org_tags_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venues" ADD CONSTRAINT "venues_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venues" ADD CONSTRAINT "venues_default_program_registration_window_id_fkey" FOREIGN KEY ("default_program_registration_window_id") REFERENCES "public"."windows"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venues" ADD CONSTRAINT "venues_default_res_availability_window_id_fkey" FOREIGN KEY ("default_res_availability_window_id") REFERENCES "public"."windows"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venues" ADD CONSTRAINT "venues_homepage_id_fkey" FOREIGN KEY ("homepage_id") REFERENCES "public"."venue_homepages"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venues" ADD CONSTRAINT "venues_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cec_emails" ADD CONSTRAINT "cec_emails_cec_id_fkey" FOREIGN KEY ("cec_id") REFERENCES "public"."cecs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pq_start_dows" ADD CONSTRAINT "pq_start_dows_pq_id_fkey" FOREIGN KEY ("pq_id") REFERENCES "public"."program_queries"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_sponsors" ADD CONSTRAINT "program_sponsors_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "program_sponsors" ADD CONSTRAINT "program_sponsors_sponsor_id_fkey" FOREIGN KEY ("sponsor_id") REFERENCES "public"."sponsors"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."quiz_questions"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscription_plan_provisions" ADD CONSTRAINT "subscription_plan_provisions_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "public"."subscription_plans"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscription_plan_provisions" ADD CONSTRAINT "subscription_plan_provisions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_homepage_callouts" ADD CONSTRAINT "venue_homepage_callouts_homepage_id_fkey" FOREIGN KEY ("homepage_id") REFERENCES "public"."venue_homepages"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "venue_homepage_callouts" ADD CONSTRAINT "venue_homepage_callouts_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "beneficiary_group_verification_emails_beneficiary_group_id_type" ON "beneficiary_group_verification_emails" USING btree ("beneficiary_group_id" uuid_ops,"type" text_ops,"value" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "benefit_bookings_beneficiary_group_id" ON "benefit_bookings" USING btree ("beneficiary_group_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "benefit_bookings_beneficiary_id" ON "benefit_bookings" USING btree ("beneficiary_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "benefit_bookings_benefit_id" ON "benefit_bookings" USING btree ("benefit_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "benefit_bookings_program_booking_id" ON "benefit_bookings" USING btree ("program_booking_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "attributes_type" ON "attributes" USING btree ("type" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "beneficiaries_benefit_id_customer_id" ON "beneficiaries" USING btree ("benefit_id" uuid_ops,"customer_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "beneficiaries_customer_id" ON "beneficiaries" USING btree ("customer_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "beneficiary_group_exclusive_blocks_beneficiary_group_id_benefit" ON "beneficiary_group_exclusive_blocks" USING btree ("beneficiary_group_id" uuid_ops,"benefit_block_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "beneficiary_group_exclusive_programs_beneficiary_group_id_benef" ON "beneficiary_group_exclusive_programs" USING btree ("beneficiary_group_id" uuid_ops,"benefit_program_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "benefit_faqs_benefit_id" ON "benefit_faqs" USING btree ("benefit_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "beneficiary_group_users_beneficiary_group_id_beneficiary_id" ON "beneficiary_group_users" USING btree ("beneficiary_group_id" uuid_ops,"beneficiary_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "beneficiary_group_users_beneficiary_id" ON "beneficiary_group_users" USING btree ("beneficiary_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "attribute_values_attribute_id" ON "attribute_values" USING btree ("attribute_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "beneficiary_groups_benefit_id" ON "beneficiary_groups" USING btree ("benefit_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "beneficiary_group_caps_beneficiary_group_id" ON "beneficiary_group_caps" USING btree ("beneficiary_group_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "benefit_blocks_benefit_venue_id" ON "benefit_blocks" USING btree ("benefit_venue_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "benefit_blocks_resource_id" ON "benefit_blocks" USING btree ("resource_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "benefit_programs_benefit_id_program_id" ON "benefit_programs" USING btree ("benefit_id" uuid_ops,"program_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "benefit_venue_faqs_benefit_venue_id" ON "benefit_venue_faqs" USING btree ("benefit_venue_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "benefit_venues_benefit_id_venue_id" ON "benefit_venues" USING btree ("benefit_id" uuid_ops,"venue_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "benefits_org_id" ON "benefits" USING btree ("org_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "benefits_sid" ON "benefits" USING btree ("sid" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "benefit_venue_permitted_beneficiary_groups_benefit_venue_id" ON "benefit_venue_permitted_beneficiary_groups" USING btree ("benefit_venue_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "benefit_venue_permitted_resources_benefit_venue_id" ON "benefit_venue_permitted_resources" USING btree ("benefit_venue_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "benefit_venue_tags_benefit_venue_id_tag_id" ON "benefit_venue_tags" USING btree ("benefit_venue_id" uuid_ops,"tag_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "blocked_users_user_id_blocked_user_id" ON "blocked_users" USING btree ("user_id" uuid_ops,"blocked_user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "club_attribute_settings_attribute_id" ON "club_attribute_settings" USING btree ("attribute_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "comments_created_at" ON "comments" USING btree ("createdAt" timestamptz_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "comments_creator_id" ON "comments" USING btree ("creator_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "comments_parent_comment_id" ON "comments" USING btree ("parent_comment_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "comments_post_id" ON "comments" USING btree ("post_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "comments_thread_id" ON "comments" USING btree ("thread_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "club_locations_club_id_location_id" ON "club_locations" USING btree ("club_id" uuid_ops,"location_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "connect_invites_invitee_id" ON "connect_invites" USING btree ("invitee_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "connect_invites_inviter_id" ON "connect_invites" USING btree ("inviter_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "custom_landing_pages_url_slug" ON "custom_landing_pages" USING btree ("url_slug" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "explore_clubs_positions_club_id" ON "explore_clubs_positions" USING btree ("club_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "explore_clubs_positions_position" ON "explore_clubs_positions" USING btree ("position" int4_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "club_attributes_attribute_id_attribute_value_id" ON "club_attributes" USING btree ("attribute_id" uuid_ops,"attribute_value_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "club_attributes_club_id" ON "club_attributes" USING btree ("club_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "clubs_org_id" ON "clubs" USING btree ("org_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "clubs_sid_uk" ON "clubs" USING btree (lower((sid)::text) text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "club_members_user_id" ON "club_members" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "club_posts_club_id_created_at_id" ON "club_posts" USING btree ("club_id" uuid_ops,"createdAt" timestamptz_ops,"id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "club_posts_club_id_post_id" ON "club_posts" USING btree ("club_id" uuid_ops,"post_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "club_products_club_id" ON "club_products" USING btree ("club_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "club_programs_club_id" ON "club_programs" USING btree ("club_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "club_programs_program_id" ON "club_programs" USING btree ("program_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "club_sponsors_club_id_sponsor_id" ON "club_sponsors" USING btree ("club_id" uuid_ops,"sponsor_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "club_venues_club_id" ON "club_venues" USING btree ("club_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "club_videos_club_id" ON "club_videos" USING btree ("club_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "club_video_products_club_video_id_product_id" ON "club_video_products" USING btree ("club_video_id" uuid_ops,"product_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "line_items_benefit_id" ON "line_items" USING btree ("benefit_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "internal_tags_btl_feature" ON "internal_tags" USING btree ("btl_feature" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "internal_tags_name" ON "internal_tags" USING btree ("name" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "order_items_order_id" ON "order_items" USING btree ("order_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "orders_invoice_id" ON "orders" USING btree ("invoice_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "orders_org_id" ON "orders" USING btree ("org_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "org_members_org_id" ON "org_members" USING btree ("org_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "locations_org_id" ON "locations" USING btree ("org_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "player_profile_quiz_outputs_answers" ON "player_profile_quiz_outputs" USING gin ("answers" array_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "orgs_sid" ON "orgs" USING btree ("sid" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ott_auth_requests_ott" ON "ott_auth_requests" USING btree ("ott" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ott_auth_requests_user_id" ON "ott_auth_requests" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "payment_methods_stripe_card_id" ON "payment_methods" USING btree ("stripe_card_id" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_images_post_id" ON "post_images" USING btree ("post_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pq_org_tags_pq_id" ON "pq_org_tags" USING btree ("pq_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pq_orgs_pq_id" ON "pq_orgs" USING btree ("pq_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pq_participant_price_cents_pq_id" ON "pq_participant_price_cents" USING btree ("pq_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pq_programs_pq_id" ON "pq_programs" USING btree ("pq_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pq_start_times_pq_id" ON "pq_start_times" USING btree ("pq_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "pro_shops_pro_page_id" ON "pro_shops" USING btree ("pro_page_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pq_types_pq_id" ON "pq_types" USING btree ("pq_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pq_venues_pq_id" ON "pq_venues" USING btree ("pq_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "pro_pages_url" ON "pro_pages" USING btree ("url" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_images_product_id" ON "product_images" USING btree ("product_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pq_names_pq_id" ON "pq_names" USING btree ("pq_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_variants_product_id" ON "product_variants" USING btree ("product_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "products_org_id" ON "products" USING btree ("org_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pq_start_dates_pq_id" ON "pq_start_dates" USING btree ("pq_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_variant_images_product_variant_id" ON "product_variant_images" USING btree ("product_variant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_variant_option_values_product_variant_id" ON "product_variant_option_values" USING btree ("product_variant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_variant_option_values_variant_option_value_id" ON "product_variant_option_values" USING btree ("variant_option_value_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_variant_stock_order_item_id" ON "product_variant_stock" USING btree ("order_item_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_variant_stock_product_variant_id" ON "product_variant_stock" USING btree ("product_variant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "programs_date" ON "programs" USING btree ("date" date_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "programs_host_id" ON "programs" USING btree ("host_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "programs_org_id" ON "programs" USING btree ("org_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "programs_sports_gin_idx" ON "programs" USING gin ("sports" array_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "programs_venue_id" ON "programs" USING btree ("venue_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "program_package_items_program_package_id" ON "program_package_items" USING btree ("program_package_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "program_packages_set_id" ON "program_packages" USING btree ("set_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "program_posts_program_id_created_at_id" ON "program_posts" USING btree ("program_id" timestamptz_ops,"createdAt" timestamptz_ops,"id" timestamptz_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "program_posts_program_id_post_id" ON "program_posts" USING btree ("program_id" uuid_ops,"post_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "program_package_sets_venue_id_org_id" ON "program_package_sets" USING btree ("venue_id" uuid_ops,"org_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "program_attribute_settings_attribute_id" ON "program_attribute_settings" USING btree ("attribute_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "program_bookings_program_id" ON "program_bookings" USING btree ("program_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "promo_codes_code" ON "promo_codes" USING btree ("code" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "program_attributes_attribute_id_attribute_value_id" ON "program_attributes" USING btree ("attribute_id" uuid_ops,"attribute_value_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "program_attributes_program_id" ON "program_attributes" USING btree ("program_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "program_products_program_id" ON "program_products" USING btree ("program_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "program_required_club_memberships_program_id_club_id" ON "program_required_club_memberships" USING btree ("program_id" uuid_ops,"club_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "program_tags_program_id_tag_id" ON "program_tags" USING btree ("program_id" uuid_ops,"tag_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "program_waitlist_users_program_id_user_id" ON "program_waitlist_users" USING btree ("program_id" uuid_ops,"user_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "promo_code_skus_promo_code_id_sku" ON "promo_code_skus" USING btree ("promo_code_id" text_ops,"sku" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "res_finite_schedules_resource_id" ON "res_finite_schedules" USING btree ("resource_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "shipping_addresses_user_id" ON "shipping_addresses" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "res_special_hours_resource_id_date" ON "res_special_hours" USING btree ("resource_id" date_ops,"date" date_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "res_schedule_hours_schedule_id" ON "res_schedule_hours" USING btree ("schedule_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "res_types_name" ON "res_types" USING btree ("name" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "role_perms_role_id_perm" ON "role_perms" USING btree ("role_id" text_ops,"perm" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "res_reservations_program_id" ON "res_reservations" USING btree ("program_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "res_reservations_resource_id" ON "res_reservations" USING btree ("resource_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "resources_venue_id_type" ON "resources" USING btree ("venue_id" text_ops,"type" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "quiz_questions_quiz_id_question" ON "quiz_questions" USING btree ("quiz_id" text_ops,"question" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "res_schedules_venue_id" ON "res_schedules" USING btree ("venue_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "roles_org_id_name" ON "roles" USING btree ("org_id" text_ops,"name" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "roles_system_code" ON "roles" USING btree ("system_code" text_ops) WHERE (system_code IS NOT NULL);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_permits_invoice_id" ON "user_permits" USING btree ("invoice_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_permits_nyc_permit_account_id" ON "user_permits" USING btree ("nyc_permit_account_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_permits_nyc_permit_card_id" ON "user_permits" USING btree ("nyc_permit_card_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_permits_permit_id" ON "user_permits" USING btree ("permit_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_permits_scraper_status" ON "user_permits" USING btree ("scraper_status" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_permits_user_id" ON "user_permits" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subscription_provisions_status" ON "subscription_provisions" USING btree ("status" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "subscription_provisions_subscription_id_role_id" ON "subscription_provisions" USING btree ("subscription_id" uuid_ops,"role_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subscription_plans_org_id" ON "subscription_plans" USING btree ("org_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "subscription_plans_system_code" ON "subscription_plans" USING btree ("system_code" text_ops) WHERE (system_code IS NOT NULL);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_interested_play_locations_city" ON "user_interested_play_locations" USING btree ("city" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_interested_play_locations_user_id" ON "user_interested_play_locations" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_package_item_beneficiary_group_uses_user_package_item_id_b" ON "user_package_item_beneficiary_group_uses" USING btree ("user_package_item_id" uuid_ops,"beneficiary_group_user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_program_packages_program_package_id" ON "user_program_packages" USING btree ("program_package_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_program_packages_purchaser_id" ON "user_program_packages" USING btree ("purchaser_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_program_packages_user_id" ON "user_program_packages" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_password_resets_user_id" ON "user_password_resets" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "variant_option_values_variant_option_id" ON "variant_option_values" USING btree ("variant_option_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_settings_user_id" ON "user_settings" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sponsors_org_id" ON "sponsors" USING btree ("org_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_eqx_info" ON "users" USING gin ("eqx_info" jsonb_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_eqx_member_id" ON "users" USING btree ("eqx_member_id" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subscription_invoices_subscription_id" ON "subscription_invoices" USING btree ("subscription_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "subscriptions_plan_id_subscriber_id" ON "subscriptions" USING btree ("plan_id" uuid_ops,"subscriber_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subscriptions_status" ON "subscriptions" USING btree ("status" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subscriptions_subscriber_id" ON "subscriptions" USING btree ("subscriber_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transfers_invoice_id" ON "transfers" USING btree ("invoice_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transfers_org_id" ON "transfers" USING btree ("org_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_program_package_items_user_program_package_id" ON "user_program_package_items" USING btree ("user_program_package_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_profile_attribute_settings_attribute_id" ON "user_profile_attribute_settings" USING btree ("attribute_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_profile_attributes_attribute_id_attribute_value_id" ON "user_profile_attributes" USING btree ("attribute_id" uuid_ops,"attribute_value_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_profile_attributes_user_id" ON "user_profile_attributes" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_program_package_item_uses_booking_id" ON "user_program_package_item_uses" USING btree ("booking_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_program_package_item_uses_user_item_id" ON "user_program_package_item_uses" USING btree ("user_package_item_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_roles_role_id_user_id" ON "user_roles" USING btree ("role_id" uuid_ops,"user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_roles_user_id" ON "user_roles" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_sessions_last_seen" ON "user_sessions" USING btree ("last_seen" timestamptz_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_sessions_session_id" ON "user_sessions" USING btree ("session_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_sessions_user_id" ON "user_sessions" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "variant_options_org_id" ON "variant_options" USING btree ("org_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "venue_homepage_faqs_homepage_id" ON "venue_homepage_faqs" USING btree ("homepage_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "venue_lesson_requests_venue_id" ON "venue_lesson_requests" USING btree ("venue_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "venue_team_members_venue_id_user_id" ON "venue_team_members" USING btree ("venue_id" uuid_ops,"user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "venue_available_lessons_venue_id" ON "venue_available_lessons" USING btree ("venue_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "venue_customers_org_customer_id_venue_id" ON "venue_customers" USING btree ("org_customer_id" uuid_ops,"venue_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "venue_customers_venue_id" ON "venue_customers" USING btree ("venue_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "venue_open_hours_venue_id" ON "venue_open_hours" USING btree ("venue_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "customers_org_id_user_id" ON "customers" USING btree ("org_id" uuid_ops,"user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "customers_user_id" ON "customers" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "venues_org_id" ON "venues" USING btree ("org_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "venues_sid" ON "venues" USING btree ("sid" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cec_emails_cec_id" ON "cec_emails" USING btree ("cec_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pq_start_dows_pq_id" ON "pq_start_dows" USING btree ("pq_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "program_sponsors_program_id_sponsor_id" ON "program_sponsors" USING btree ("program_id" uuid_ops,"sponsor_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "quiz_answers_question_id_answer" ON "quiz_answers" USING btree ("question_id" text_ops,"answer" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "subscription_plan_provisions_plan_id_role_id" ON "subscription_plan_provisions" USING btree ("plan_id" uuid_ops,"role_id" uuid_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "venue_homepage_callouts_homepage_id" ON "venue_homepage_callouts" USING btree ("homepage_id" uuid_ops);
*/