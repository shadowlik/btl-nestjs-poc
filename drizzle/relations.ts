import { relations } from "drizzle-orm/relations";
import { beneficiary_groups, beneficiary_group_verification_emails, benefit_bookings, beneficiaries, benefits, program_bookings, customers, beneficiary_group_exclusive_blocks, benefit_blocks, beneficiary_group_exclusive_programs, benefit_programs, benefit_faqs, beneficiary_group_users, users, assets, attributes, attribute_values, beneficiary_group_caps, caps, benefit_venues, resources, programs, benefit_venue_faqs, venues, orgs, benefit_venue_permitted_beneficiary_groups, benefit_venue_permitted_resources, benefit_venue_tags, org_tags, blocked_users, btl_featured_facilities, btl_featured_geos, btl_org, club_attribute_settings, comments, posts, clubs, club_locations, locations, connect_invites, custom_landing_pages, internal_tags, explore_clubs_positions, cecs, club_attributes, program_queries, club_members, club_posts, club_products, products, club_programs, club_sponsors, sponsors, club_venues, club_videos, club_video_products, fee_rules, invoices, lesson_requests, line_items, promo_codes, nyc_permit_accounts, nyc_permit_cards, order_items, orders, product_variants, res_reservations, user_permits, user_program_packages, shipping_addresses, org_members, payments, payment_methods, quizzes, player_profile_quiz, windows, ott_auth_requests, addresses, post_images, pq_org_tags, pq_orgs, pq_participant_price_cents, pq_programs, pq_start_times, pro_pages, pro_shops, pq_types, pq_venues, pro_page_images, pro_shop_item_images, pro_shop_items, product_images, pq_names, pq_start_dates, product_variant_images, product_variant_option_values, variant_option_values, product_variant_stock, program_internal_tags, program_package_items, program_packages, program_package_sets, program_posts, promo_code_programs, program_attribute_settings, program_attributes, program_images, program_inclusions, program_locations, program_products, program_required_club_memberships, program_tags, program_waitlist_users, promo_code_skus, promo_code_users, promo_code_uses, quiz_answers, quiz_submission_answers, quiz_questions, quiz_submissions, refunds, res_finite_schedules, res_schedules, res_special_hours, res_schedule_hours, perms, role_perms, roles, saas_requests, res_types, purchasable_permits, subscription_provisions, subscriptions, subscription_plans, user_interested_play_locations, user_package_item_beneficiary_group_uses, user_program_package_items, user_password_resets, variant_options, user_settings, subscription_invoices, transfers, user_profile_attribute_settings, user_profile_attributes, user_program_package_item_uses, user_roles, user_sessions, venue_homepages, venue_homepage_faqs, venue_images, venue_customers, venue_lesson_requests, venue_team_members, venue_available_lessons, venue_open_hours, asset_delete_queue, cec_emails, pq_start_dows, program_sponsors, subscription_plan_provisions, venue_homepage_callouts } from "./schema";

export const beneficiary_group_verification_emailsRelations = relations(beneficiary_group_verification_emails, ({one}) => ({
	beneficiary_group: one(beneficiary_groups, {
		fields: [beneficiary_group_verification_emails.beneficiary_group_id],
		references: [beneficiary_groups.id]
	}),
}));

export const beneficiary_groupsRelations = relations(beneficiary_groups, ({one, many}) => ({
	beneficiary_group_verification_emails: many(beneficiary_group_verification_emails),
	benefit_bookings: many(benefit_bookings),
	beneficiary_group_exclusive_blocks: many(beneficiary_group_exclusive_blocks),
	beneficiary_group_exclusive_programs: many(beneficiary_group_exclusive_programs),
	beneficiary_group_users: many(beneficiary_group_users),
	benefit: one(benefits, {
		fields: [beneficiary_groups.benefit_id],
		references: [benefits.id]
	}),
	beneficiary_group_caps: many(beneficiary_group_caps),
	benefit_venue_permitted_beneficiary_groups: many(benefit_venue_permitted_beneficiary_groups),
	program_package_items: many(program_package_items),
	user_program_package_items: many(user_program_package_items),
}));

export const benefit_bookingsRelations = relations(benefit_bookings, ({one}) => ({
	beneficiary_group: one(beneficiary_groups, {
		fields: [benefit_bookings.beneficiary_group_id],
		references: [beneficiary_groups.id]
	}),
	beneficiary: one(beneficiaries, {
		fields: [benefit_bookings.beneficiary_id],
		references: [beneficiaries.id]
	}),
	benefit: one(benefits, {
		fields: [benefit_bookings.benefit_id],
		references: [benefits.id]
	}),
	program_booking: one(program_bookings, {
		fields: [benefit_bookings.program_booking_id],
		references: [program_bookings.id]
	}),
}));

export const beneficiariesRelations = relations(beneficiaries, ({one, many}) => ({
	benefit_bookings: many(benefit_bookings),
	benefit: one(benefits, {
		fields: [beneficiaries.benefit_id],
		references: [benefits.id]
	}),
	customer: one(customers, {
		fields: [beneficiaries.customer_id],
		references: [customers.id]
	}),
	beneficiary_group_users: many(beneficiary_group_users),
}));

export const benefitsRelations = relations(benefits, ({one, many}) => ({
	benefit_bookings: many(benefit_bookings),
	beneficiaries: many(beneficiaries),
	benefit_faqs: many(benefit_faqs),
	beneficiary_groups: many(beneficiary_groups),
	benefit_programs: many(benefit_programs),
	benefit_venues: many(benefit_venues),
	user: one(users, {
		fields: [benefits.creator_id],
		references: [users.id]
	}),
	org: one(orgs, {
		fields: [benefits.org_id],
		references: [orgs.id]
	}),
	clubs: many(clubs),
	line_items: many(line_items),
}));

export const program_bookingsRelations = relations(program_bookings, ({one, many}) => ({
	benefit_bookings: many(benefit_bookings),
	order_items: many(order_items),
	user_checkedin_by: one(users, {
		fields: [program_bookings.checkedin_by],
		references: [users.id],
		relationName: "program_bookings_checkedin_by_users_id"
	}),
	invoice: one(invoices, {
		fields: [program_bookings.invoice_id],
		references: [invoices.id]
	}),
	user_participant_id: one(users, {
		fields: [program_bookings.participant_id],
		references: [users.id],
		relationName: "program_bookings_participant_id_users_id"
	}),
	program: one(programs, {
		fields: [program_bookings.program_id],
		references: [programs.id]
	}),
	user_purchaser_id: one(users, {
		fields: [program_bookings.purchaser_id],
		references: [users.id],
		relationName: "program_bookings_purchaser_id_users_id"
	}),
	user_program_package_item_uses: many(user_program_package_item_uses),
}));

export const customersRelations = relations(customers, ({one, many}) => ({
	beneficiaries: many(beneficiaries),
	venue_customers: many(venue_customers),
	org: one(orgs, {
		fields: [customers.org_id],
		references: [orgs.id]
	}),
	user: one(users, {
		fields: [customers.user_id],
		references: [users.id]
	}),
}));

export const beneficiary_group_exclusive_blocksRelations = relations(beneficiary_group_exclusive_blocks, ({one}) => ({
	beneficiary_group: one(beneficiary_groups, {
		fields: [beneficiary_group_exclusive_blocks.beneficiary_group_id],
		references: [beneficiary_groups.id]
	}),
	benefit_block: one(benefit_blocks, {
		fields: [beneficiary_group_exclusive_blocks.benefit_block_id],
		references: [benefit_blocks.id]
	}),
}));

export const benefit_blocksRelations = relations(benefit_blocks, ({one, many}) => ({
	beneficiary_group_exclusive_blocks: many(beneficiary_group_exclusive_blocks),
	benefit_venue: one(benefit_venues, {
		fields: [benefit_blocks.benefit_venue_id],
		references: [benefit_venues.id]
	}),
	resource: one(resources, {
		fields: [benefit_blocks.resource_id],
		references: [resources.id]
	}),
}));

export const beneficiary_group_exclusive_programsRelations = relations(beneficiary_group_exclusive_programs, ({one}) => ({
	beneficiary_group: one(beneficiary_groups, {
		fields: [beneficiary_group_exclusive_programs.beneficiary_group_id],
		references: [beneficiary_groups.id]
	}),
	benefit_program: one(benefit_programs, {
		fields: [beneficiary_group_exclusive_programs.benefit_program_id],
		references: [benefit_programs.id]
	}),
}));

export const benefit_programsRelations = relations(benefit_programs, ({one, many}) => ({
	beneficiary_group_exclusive_programs: many(beneficiary_group_exclusive_programs),
	benefit: one(benefits, {
		fields: [benefit_programs.benefit_id],
		references: [benefits.id]
	}),
	program: one(programs, {
		fields: [benefit_programs.program_id],
		references: [programs.id]
	}),
}));

export const benefit_faqsRelations = relations(benefit_faqs, ({one}) => ({
	benefit: one(benefits, {
		fields: [benefit_faqs.benefit_id],
		references: [benefits.id]
	}),
}));

export const beneficiary_group_usersRelations = relations(beneficiary_group_users, ({one, many}) => ({
	beneficiary_group: one(beneficiary_groups, {
		fields: [beneficiary_group_users.beneficiary_group_id],
		references: [beneficiary_groups.id]
	}),
	beneficiary: one(beneficiaries, {
		fields: [beneficiary_group_users.beneficiary_id],
		references: [beneficiaries.id]
	}),
	user_package_item_beneficiary_group_uses: many(user_package_item_beneficiary_group_uses),
}));

export const assetsRelations = relations(assets, ({one, many}) => ({
	user: one(users, {
		fields: [assets.creator_id],
		references: [users.id],
		relationName: "assets_creator_id_users_id"
	}),
	btl_featured_geos: many(btl_featured_geos),
	cecs: many(cecs),
	clubs_cover_id: many(clubs, {
		relationName: "clubs_cover_id_assets_id"
	}),
	clubs_icon_id: many(clubs, {
		relationName: "clubs_icon_id_assets_id"
	}),
	post_images: many(post_images),
	pro_page_images: many(pro_page_images),
	pro_shop_item_images: many(pro_shop_item_images),
	product_images: many(product_images),
	product_variant_images: many(product_variant_images),
	program_images: many(program_images),
	user_permits_app_identification_photo_id: many(user_permits, {
		relationName: "user_permits_app_identification_photo_id_assets_id"
	}),
	user_permits_app_idnyc_photo_id: many(user_permits, {
		relationName: "user_permits_app_idnyc_photo_id_assets_id"
	}),
	user_permits_app_permit_photo_id: many(user_permits, {
		relationName: "user_permits_app_permit_photo_id_assets_id"
	}),
	sponsors_icon_id: many(sponsors, {
		relationName: "sponsors_icon_id_assets_id"
	}),
	sponsors_logo_id: many(sponsors, {
		relationName: "sponsors_logo_id_assets_id"
	}),
	users: many(users, {
		relationName: "users_profile_image_id_assets_id"
	}),
	venue_images: many(venue_images),
	asset_delete_queues: many(asset_delete_queue),
	venue_homepage_callouts: many(venue_homepage_callouts),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	assets: many(assets, {
		relationName: "assets_creator_id_users_id"
	}),
	benefits: many(benefits),
	benefit_venue_tags: many(benefit_venue_tags),
	blocked_users_blocked_user_id: many(blocked_users, {
		relationName: "blocked_users_blocked_user_id_users_id"
	}),
	blocked_users_user_id: many(blocked_users, {
		relationName: "blocked_users_user_id_users_id"
	}),
	comments: many(comments),
	connect_invites_invitee_id: many(connect_invites, {
		relationName: "connect_invites_invitee_id_users_id"
	}),
	connect_invites_inviter_id: many(connect_invites, {
		relationName: "connect_invites_inviter_id_users_id"
	}),
	custom_landing_pages: many(custom_landing_pages),
	cecs: many(cecs),
	clubs: many(clubs),
	club_members: many(club_members),
	fee_rules: many(fee_rules),
	invoices: many(invoices),
	lesson_requests: many(lesson_requests),
	nyc_permit_accounts: many(nyc_permit_accounts),
	internal_tags: many(internal_tags),
	nyc_permit_cards: many(nyc_permit_cards),
	orders: many(orders),
	org_members: many(org_members),
	payments: many(payments),
	ott_auth_requests: many(ott_auth_requests),
	payment_methods: many(payment_methods),
	pro_pages: many(pro_pages),
	posts: many(posts),
	products: many(products),
	product_variant_stocks: many(product_variant_stock),
	programs_canceler_id: many(programs, {
		relationName: "programs_canceler_id_users_id"
	}),
	programs_creator_id: many(programs, {
		relationName: "programs_creator_id_users_id"
	}),
	programs_host_id: many(programs, {
		relationName: "programs_host_id_users_id"
	}),
	program_internal_tags: many(program_internal_tags),
	program_bookings_checkedin_by: many(program_bookings, {
		relationName: "program_bookings_checkedin_by_users_id"
	}),
	program_bookings_participant_id: many(program_bookings, {
		relationName: "program_bookings_participant_id_users_id"
	}),
	program_bookings_purchaser_id: many(program_bookings, {
		relationName: "program_bookings_purchaser_id_users_id"
	}),
	program_tags: many(program_tags),
	program_waitlist_users: many(program_waitlist_users),
	promo_code_users: many(promo_code_users),
	promo_code_uses: many(promo_code_uses),
	quiz_submissions: many(quiz_submissions),
	refunds: many(refunds),
	shipping_addresses: many(shipping_addresses),
	saas_requests: many(saas_requests),
	res_schedules: many(res_schedules),
	user_permits_manual_fulfiller_id: many(user_permits, {
		relationName: "user_permits_manual_fulfiller_id_users_id"
	}),
	user_permits_user_id: many(user_permits, {
		relationName: "user_permits_user_id_users_id"
	}),
	subscription_plans: many(subscription_plans),
	user_interested_play_locations: many(user_interested_play_locations),
	user_program_packages_canceler_id: many(user_program_packages, {
		relationName: "user_program_packages_canceler_id_users_id"
	}),
	user_program_packages_purchaser_id: many(user_program_packages, {
		relationName: "user_program_packages_purchaser_id_users_id"
	}),
	user_program_packages_user_id: many(user_program_packages, {
		relationName: "user_program_packages_user_id_users_id"
	}),
	user_password_resets: many(user_password_resets),
	user_settings: many(user_settings),
	sponsors: many(sponsors),
	asset: one(assets, {
		fields: [users.profile_image_id],
		references: [assets.id],
		relationName: "users_profile_image_id_assets_id"
	}),
	subscriptions: many(subscriptions),
	user_profile_attributes: many(user_profile_attributes),
	user_roles_creator_id: many(user_roles, {
		relationName: "user_roles_creator_id_users_id"
	}),
	user_roles_user_id: many(user_roles, {
		relationName: "user_roles_user_id_users_id"
	}),
	user_sessions: many(user_sessions),
	venue_team_members: many(venue_team_members),
	venue_homepages: many(venue_homepages),
	customers: many(customers),
	org_tags: many(org_tags),
}));

export const attribute_valuesRelations = relations(attribute_values, ({one, many}) => ({
	attribute: one(attributes, {
		fields: [attribute_values.attribute_id],
		references: [attributes.id]
	}),
	club_attributes: many(club_attributes),
	program_attributes: many(program_attributes),
	user_profile_attributes: many(user_profile_attributes),
}));

export const attributesRelations = relations(attributes, ({many}) => ({
	attribute_values: many(attribute_values),
	club_attribute_settings: many(club_attribute_settings),
	club_attributes: many(club_attributes),
	program_attribute_settings: many(program_attribute_settings),
	program_attributes: many(program_attributes),
	user_profile_attribute_settings: many(user_profile_attribute_settings),
	user_profile_attributes: many(user_profile_attributes),
}));

export const beneficiary_group_capsRelations = relations(beneficiary_group_caps, ({one}) => ({
	beneficiary_group: one(beneficiary_groups, {
		fields: [beneficiary_group_caps.beneficiary_group_id],
		references: [beneficiary_groups.id]
	}),
	cap: one(caps, {
		fields: [beneficiary_group_caps.cap_id],
		references: [caps.id]
	}),
}));

export const capsRelations = relations(caps, ({many}) => ({
	beneficiary_group_caps: many(beneficiary_group_caps),
}));

export const benefit_venuesRelations = relations(benefit_venues, ({one, many}) => ({
	benefit_blocks: many(benefit_blocks),
	benefit_venue_faqs: many(benefit_venue_faqs),
	benefit: one(benefits, {
		fields: [benefit_venues.benefit_id],
		references: [benefits.id]
	}),
	venue: one(venues, {
		fields: [benefit_venues.venue_id],
		references: [venues.id]
	}),
	benefit_venue_permitted_beneficiary_groups: many(benefit_venue_permitted_beneficiary_groups),
	benefit_venue_permitted_resources: many(benefit_venue_permitted_resources),
	benefit_venue_tags: many(benefit_venue_tags),
}));

export const resourcesRelations = relations(resources, ({one, many}) => ({
	benefit_blocks: many(benefit_blocks),
	benefit_venue_permitted_resources: many(benefit_venue_permitted_resources),
	order_items: many(order_items),
	res_finite_schedules: many(res_finite_schedules),
	res_special_hours: many(res_special_hours),
	res_reservations: many(res_reservations),
	window: one(windows, {
		fields: [resources.default_availability_window_id],
		references: [windows.id]
	}),
	res_schedule: one(res_schedules, {
		fields: [resources.schedule_id],
		references: [res_schedules.id]
	}),
	res_type: one(res_types, {
		fields: [resources.type],
		references: [res_types.name]
	}),
	venue: one(venues, {
		fields: [resources.venue_id],
		references: [venues.id]
	}),
}));

export const programsRelations = relations(programs, ({one, many}) => ({
	benefit_programs: many(benefit_programs),
	club_programs: many(club_programs),
	order_items: many(order_items),
	pq_programs: many(pq_programs),
	user_canceler_id: one(users, {
		fields: [programs.canceler_id],
		references: [users.id],
		relationName: "programs_canceler_id_users_id"
	}),
	user_creator_id: one(users, {
		fields: [programs.creator_id],
		references: [users.id],
		relationName: "programs_creator_id_users_id"
	}),
	window: one(windows, {
		fields: [programs.default_registration_window_id],
		references: [windows.id]
	}),
	user_host_id: one(users, {
		fields: [programs.host_id],
		references: [users.id],
		relationName: "programs_host_id_users_id"
	}),
	org: one(orgs, {
		fields: [programs.org_id],
		references: [orgs.id]
	}),
	venue: one(venues, {
		fields: [programs.venue_id],
		references: [venues.id]
	}),
	program_internal_tags: many(program_internal_tags),
	program_posts: many(program_posts),
	promo_code_programs: many(promo_code_programs),
	program_bookings: many(program_bookings),
	program_attributes: many(program_attributes),
	program_images: many(program_images),
	program_inclusions: many(program_inclusions),
	program_locations: many(program_locations),
	program_products: many(program_products),
	program_required_club_memberships: many(program_required_club_memberships),
	program_tags: many(program_tags),
	program_waitlist_users: many(program_waitlist_users),
	res_reservations: many(res_reservations),
	program_sponsors: many(program_sponsors),
}));

export const benefit_venue_faqsRelations = relations(benefit_venue_faqs, ({one}) => ({
	benefit_venue: one(benefit_venues, {
		fields: [benefit_venue_faqs.benefit_venue_id],
		references: [benefit_venues.id]
	}),
}));

export const venuesRelations = relations(venues, ({one, many}) => ({
	benefit_venues: many(benefit_venues),
	btl_featured_facilities: many(btl_featured_facilities),
	club_venues: many(club_venues),
	pq_venues: many(pq_venues),
	programs: many(programs),
	program_package_sets: many(program_package_sets),
	resources: many(resources),
	res_schedules: many(res_schedules),
	user_program_packages: many(user_program_packages),
	venue_images: many(venue_images),
	venue_lesson_requests: many(venue_lesson_requests),
	venue_team_members: many(venue_team_members),
	venue_available_lessons: many(venue_available_lessons),
	venue_customers: many(venue_customers),
	venue_open_hours: many(venue_open_hours),
	address: one(addresses, {
		fields: [venues.address_id],
		references: [addresses.id]
	}),
	window_default_program_registration_window_id: one(windows, {
		fields: [venues.default_program_registration_window_id],
		references: [windows.id],
		relationName: "venues_default_program_registration_window_id_windows_id"
	}),
	window_default_res_availability_window_id: one(windows, {
		fields: [venues.default_res_availability_window_id],
		references: [windows.id],
		relationName: "venues_default_res_availability_window_id_windows_id"
	}),
	venue_homepage: one(venue_homepages, {
		fields: [venues.homepage_id],
		references: [venue_homepages.id]
	}),
	org: one(orgs, {
		fields: [venues.org_id],
		references: [orgs.id]
	}),
}));

export const orgsRelations = relations(orgs, ({one, many}) => ({
	benefits: many(benefits),
	btl_featured_facilities: many(btl_featured_facilities),
	btl_orgs: many(btl_org),
	clubs: many(clubs),
	fee_rules: many(fee_rules),
	orders: many(orders),
	org_members: many(org_members),
	locations: many(locations),
	window: one(windows, {
		fields: [orgs.default_program_registration_window_id],
		references: [windows.id]
	}),
	pq_orgs: many(pq_orgs),
	products: many(products),
	programs: many(programs),
	program_package_sets: many(program_package_sets),
	roles: many(roles),
	subscription_plans: many(subscription_plans),
	user_program_packages: many(user_program_packages),
	sponsors: many(sponsors),
	transfers: many(transfers),
	variant_options: many(variant_options),
	customers: many(customers),
	org_tags: many(org_tags),
	venues: many(venues),
}));

export const benefit_venue_permitted_beneficiary_groupsRelations = relations(benefit_venue_permitted_beneficiary_groups, ({one}) => ({
	beneficiary_group: one(beneficiary_groups, {
		fields: [benefit_venue_permitted_beneficiary_groups.beneficiary_group_id],
		references: [beneficiary_groups.id]
	}),
	benefit_venue: one(benefit_venues, {
		fields: [benefit_venue_permitted_beneficiary_groups.benefit_venue_id],
		references: [benefit_venues.id]
	}),
}));

export const benefit_venue_permitted_resourcesRelations = relations(benefit_venue_permitted_resources, ({one}) => ({
	benefit_venue: one(benefit_venues, {
		fields: [benefit_venue_permitted_resources.benefit_venue_id],
		references: [benefit_venues.id]
	}),
	resource: one(resources, {
		fields: [benefit_venue_permitted_resources.resource_id],
		references: [resources.id]
	}),
}));

export const benefit_venue_tagsRelations = relations(benefit_venue_tags, ({one}) => ({
	benefit_venue: one(benefit_venues, {
		fields: [benefit_venue_tags.benefit_venue_id],
		references: [benefit_venues.id]
	}),
	user: one(users, {
		fields: [benefit_venue_tags.creator_id],
		references: [users.id]
	}),
	org_tag: one(org_tags, {
		fields: [benefit_venue_tags.tag_id],
		references: [org_tags.id]
	}),
}));

export const org_tagsRelations = relations(org_tags, ({one, many}) => ({
	benefit_venue_tags: many(benefit_venue_tags),
	pq_org_tags: many(pq_org_tags),
	program_tags: many(program_tags),
	user: one(users, {
		fields: [org_tags.creator_id],
		references: [users.id]
	}),
	org: one(orgs, {
		fields: [org_tags.org_id],
		references: [orgs.id]
	}),
}));

export const blocked_usersRelations = relations(blocked_users, ({one}) => ({
	user_blocked_user_id: one(users, {
		fields: [blocked_users.blocked_user_id],
		references: [users.id],
		relationName: "blocked_users_blocked_user_id_users_id"
	}),
	user_user_id: one(users, {
		fields: [blocked_users.user_id],
		references: [users.id],
		relationName: "blocked_users_user_id_users_id"
	}),
}));

export const btl_featured_facilitiesRelations = relations(btl_featured_facilities, ({one}) => ({
	org: one(orgs, {
		fields: [btl_featured_facilities.org_id],
		references: [orgs.id]
	}),
	venue: one(venues, {
		fields: [btl_featured_facilities.venue_id],
		references: [venues.id]
	}),
}));

export const btl_featured_geosRelations = relations(btl_featured_geos, ({one}) => ({
	asset: one(assets, {
		fields: [btl_featured_geos.image_id],
		references: [assets.id]
	}),
}));

export const btl_orgRelations = relations(btl_org, ({one}) => ({
	org: one(orgs, {
		fields: [btl_org.org_id],
		references: [orgs.id]
	}),
}));

export const club_attribute_settingsRelations = relations(club_attribute_settings, ({one}) => ({
	attribute: one(attributes, {
		fields: [club_attribute_settings.attribute_id],
		references: [attributes.id]
	}),
}));

export const commentsRelations = relations(comments, ({one, many}) => ({
	user: one(users, {
		fields: [comments.creator_id],
		references: [users.id]
	}),
	comment: one(comments, {
		fields: [comments.parent_comment_id],
		references: [comments.id],
		relationName: "comments_parent_comment_id_comments_id"
	}),
	comments: many(comments, {
		relationName: "comments_parent_comment_id_comments_id"
	}),
	post: one(posts, {
		fields: [comments.post_id],
		references: [posts.id]
	}),
}));

export const postsRelations = relations(posts, ({one, many}) => ({
	comments: many(comments),
	club_posts: many(club_posts),
	post_images: many(post_images),
	user: one(users, {
		fields: [posts.creator_id],
		references: [users.id]
	}),
	program_posts: many(program_posts),
}));

export const club_locationsRelations = relations(club_locations, ({one}) => ({
	club: one(clubs, {
		fields: [club_locations.club_id],
		references: [clubs.id]
	}),
	location: one(locations, {
		fields: [club_locations.location_id],
		references: [locations.id]
	}),
}));

export const clubsRelations = relations(clubs, ({one, many}) => ({
	club_locations: many(club_locations),
	explore_clubs_positions: many(explore_clubs_positions),
	club_attributes: many(club_attributes),
	benefit: one(benefits, {
		fields: [clubs.benefit_id],
		references: [benefits.id]
	}),
	asset_cover_id: one(assets, {
		fields: [clubs.cover_id],
		references: [assets.id],
		relationName: "clubs_cover_id_assets_id"
	}),
	user: one(users, {
		fields: [clubs.creator_id],
		references: [users.id]
	}),
	asset_icon_id: one(assets, {
		fields: [clubs.icon_id],
		references: [assets.id],
		relationName: "clubs_icon_id_assets_id"
	}),
	org: one(orgs, {
		fields: [clubs.org_id],
		references: [orgs.id]
	}),
	program_query: one(program_queries, {
		fields: [clubs.program_query_id],
		references: [program_queries.id]
	}),
	club_members: many(club_members),
	club_posts: many(club_posts),
	club_products: many(club_products),
	club_programs: many(club_programs),
	club_sponsors: many(club_sponsors),
	club_venues: many(club_venues),
	club_videos: many(club_videos),
	program_required_club_memberships: many(program_required_club_memberships),
	saas_requests: many(saas_requests),
}));

export const locationsRelations = relations(locations, ({one, many}) => ({
	club_locations: many(club_locations),
	org: one(orgs, {
		fields: [locations.org_id],
		references: [orgs.id]
	}),
	program_locations: many(program_locations),
}));

export const connect_invitesRelations = relations(connect_invites, ({one}) => ({
	user_invitee_id: one(users, {
		fields: [connect_invites.invitee_id],
		references: [users.id],
		relationName: "connect_invites_invitee_id_users_id"
	}),
	user_inviter_id: one(users, {
		fields: [connect_invites.inviter_id],
		references: [users.id],
		relationName: "connect_invites_inviter_id_users_id"
	}),
}));

export const custom_landing_pagesRelations = relations(custom_landing_pages, ({one}) => ({
	user: one(users, {
		fields: [custom_landing_pages.creator_id],
		references: [users.id]
	}),
	internal_tag: one(internal_tags, {
		fields: [custom_landing_pages.internal_tag_id],
		references: [internal_tags.id]
	}),
}));

export const internal_tagsRelations = relations(internal_tags, ({one, many}) => ({
	custom_landing_pages: many(custom_landing_pages),
	user: one(users, {
		fields: [internal_tags.creator_id],
		references: [users.id]
	}),
	program_internal_tags: many(program_internal_tags),
}));

export const explore_clubs_positionsRelations = relations(explore_clubs_positions, ({one}) => ({
	club: one(clubs, {
		fields: [explore_clubs_positions.club_id],
		references: [clubs.id]
	}),
}));

export const cecsRelations = relations(cecs, ({one, many}) => ({
	user: one(users, {
		fields: [cecs.creator_id],
		references: [users.id]
	}),
	asset: one(assets, {
		fields: [cecs.image_id],
		references: [assets.id]
	}),
	cec_emails: many(cec_emails),
}));

export const club_attributesRelations = relations(club_attributes, ({one}) => ({
	attribute: one(attributes, {
		fields: [club_attributes.attribute_id],
		references: [attributes.id]
	}),
	attribute_value: one(attribute_values, {
		fields: [club_attributes.attribute_value_id],
		references: [attribute_values.id]
	}),
	club: one(clubs, {
		fields: [club_attributes.club_id],
		references: [clubs.id]
	}),
}));

export const program_queriesRelations = relations(program_queries, ({many}) => ({
	clubs: many(clubs),
	pq_org_tags: many(pq_org_tags),
	pq_orgs: many(pq_orgs),
	pq_participant_price_cents: many(pq_participant_price_cents),
	pq_programs: many(pq_programs),
	pq_start_times: many(pq_start_times),
	pq_types: many(pq_types),
	pq_venues: many(pq_venues),
	pq_names: many(pq_names),
	pq_start_dates: many(pq_start_dates),
	program_package_items: many(program_package_items),
	user_program_package_items: many(user_program_package_items),
	pq_start_dows: many(pq_start_dows),
}));

export const club_membersRelations = relations(club_members, ({one}) => ({
	club: one(clubs, {
		fields: [club_members.club_id],
		references: [clubs.id]
	}),
	user: one(users, {
		fields: [club_members.user_id],
		references: [users.id]
	}),
}));

export const club_postsRelations = relations(club_posts, ({one}) => ({
	club: one(clubs, {
		fields: [club_posts.club_id],
		references: [clubs.id]
	}),
	post: one(posts, {
		fields: [club_posts.post_id],
		references: [posts.id]
	}),
}));

export const club_productsRelations = relations(club_products, ({one}) => ({
	club: one(clubs, {
		fields: [club_products.club_id],
		references: [clubs.id]
	}),
	product: one(products, {
		fields: [club_products.product_id],
		references: [products.id]
	}),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	club_products: many(club_products),
	club_video_products: many(club_video_products),
	product_images: many(product_images),
	product_variants: many(product_variants),
	user: one(users, {
		fields: [products.creator_id],
		references: [users.id]
	}),
	org: one(orgs, {
		fields: [products.org_id],
		references: [orgs.id]
	}),
	program_products: many(program_products),
}));

export const club_programsRelations = relations(club_programs, ({one}) => ({
	club: one(clubs, {
		fields: [club_programs.club_id],
		references: [clubs.id]
	}),
	program: one(programs, {
		fields: [club_programs.program_id],
		references: [programs.id]
	}),
}));

export const club_sponsorsRelations = relations(club_sponsors, ({one}) => ({
	club: one(clubs, {
		fields: [club_sponsors.club_id],
		references: [clubs.id]
	}),
	sponsor: one(sponsors, {
		fields: [club_sponsors.sponsor_id],
		references: [sponsors.id]
	}),
}));

export const sponsorsRelations = relations(sponsors, ({one, many}) => ({
	club_sponsors: many(club_sponsors),
	user: one(users, {
		fields: [sponsors.creator_id],
		references: [users.id]
	}),
	asset_icon_id: one(assets, {
		fields: [sponsors.icon_id],
		references: [assets.id],
		relationName: "sponsors_icon_id_assets_id"
	}),
	asset_logo_id: one(assets, {
		fields: [sponsors.logo_id],
		references: [assets.id],
		relationName: "sponsors_logo_id_assets_id"
	}),
	org: one(orgs, {
		fields: [sponsors.org_id],
		references: [orgs.id]
	}),
	program_sponsors: many(program_sponsors),
}));

export const club_venuesRelations = relations(club_venues, ({one}) => ({
	club: one(clubs, {
		fields: [club_venues.club_id],
		references: [clubs.id]
	}),
	venue: one(venues, {
		fields: [club_venues.venue_id],
		references: [venues.id]
	}),
}));

export const club_videosRelations = relations(club_videos, ({one, many}) => ({
	club: one(clubs, {
		fields: [club_videos.club_id],
		references: [clubs.id]
	}),
	club_video_products: many(club_video_products),
}));

export const club_video_productsRelations = relations(club_video_products, ({one}) => ({
	club_video: one(club_videos, {
		fields: [club_video_products.club_video_id],
		references: [club_videos.id]
	}),
	product: one(products, {
		fields: [club_video_products.product_id],
		references: [products.id]
	}),
}));

export const fee_rulesRelations = relations(fee_rules, ({one}) => ({
	user: one(users, {
		fields: [fee_rules.creator_id],
		references: [users.id]
	}),
	org: one(orgs, {
		fields: [fee_rules.org_id],
		references: [orgs.id]
	}),
}));

export const invoicesRelations = relations(invoices, ({one, many}) => ({
	user: one(users, {
		fields: [invoices.user_id],
		references: [users.id]
	}),
	line_items: many(line_items),
	orders: many(orders),
	payments: many(payments),
	program_bookings: many(program_bookings),
	promo_code_uses: many(promo_code_uses),
	user_permits: many(user_permits),
	subscription_invoices: many(subscription_invoices),
	transfers: many(transfers),
}));

export const lesson_requestsRelations = relations(lesson_requests, ({one, many}) => ({
	user: one(users, {
		fields: [lesson_requests.requester_id],
		references: [users.id]
	}),
	venue_lesson_requests: many(venue_lesson_requests),
}));

export const line_itemsRelations = relations(line_items, ({one, many}) => ({
	benefit: one(benefits, {
		fields: [line_items.benefit_id],
		references: [benefits.id]
	}),
	invoice: one(invoices, {
		fields: [line_items.invoice_id],
		references: [invoices.id]
	}),
	promo_code: one(promo_codes, {
		fields: [line_items.promo_code_id],
		references: [promo_codes.id]
	}),
	order_items: many(order_items),
}));

export const promo_codesRelations = relations(promo_codes, ({many}) => ({
	line_items: many(line_items),
	promo_code_programs: many(promo_code_programs),
	promo_code_skuses: many(promo_code_skus),
	promo_code_users: many(promo_code_users),
	promo_code_uses: many(promo_code_uses),
}));

export const nyc_permit_accountsRelations = relations(nyc_permit_accounts, ({one, many}) => ({
	user: one(users, {
		fields: [nyc_permit_accounts.creator_id],
		references: [users.id]
	}),
	user_permits: many(user_permits),
}));

export const nyc_permit_cardsRelations = relations(nyc_permit_cards, ({one, many}) => ({
	user: one(users, {
		fields: [nyc_permit_cards.creator_id],
		references: [users.id]
	}),
	user_permits: many(user_permits),
}));

export const order_itemsRelations = relations(order_items, ({one, many}) => ({
	line_item: one(line_items, {
		fields: [order_items.line_item_id],
		references: [line_items.id]
	}),
	order: one(orders, {
		fields: [order_items.order_id],
		references: [orders.id]
	}),
	product_variant: one(product_variants, {
		fields: [order_items.product_variant_id],
		references: [product_variants.id]
	}),
	program_booking: one(program_bookings, {
		fields: [order_items.program_booking_id],
		references: [program_bookings.id]
	}),
	program: one(programs, {
		fields: [order_items.program_id],
		references: [programs.id]
	}),
	res_reservation: one(res_reservations, {
		fields: [order_items.res_reservation_id],
		references: [res_reservations.id]
	}),
	resource: one(resources, {
		fields: [order_items.resource_id],
		references: [resources.id]
	}),
	user_permit: one(user_permits, {
		fields: [order_items.user_permit_id],
		references: [user_permits.id]
	}),
	user_program_package: one(user_program_packages, {
		fields: [order_items.user_program_package_id],
		references: [user_program_packages.id]
	}),
	product_variant_stocks: many(product_variant_stock),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	order_items: many(order_items),
	invoice: one(invoices, {
		fields: [orders.invoice_id],
		references: [invoices.id]
	}),
	org: one(orgs, {
		fields: [orders.org_id],
		references: [orgs.id]
	}),
	shipping_address: one(shipping_addresses, {
		fields: [orders.shipping_address_id],
		references: [shipping_addresses.id]
	}),
	user: one(users, {
		fields: [orders.user_id],
		references: [users.id]
	}),
}));

export const product_variantsRelations = relations(product_variants, ({one, many}) => ({
	order_items: many(order_items),
	product: one(products, {
		fields: [product_variants.product_id],
		references: [products.id]
	}),
	product_variant_images: many(product_variant_images),
	product_variant_option_values: many(product_variant_option_values),
	product_variant_stocks: many(product_variant_stock),
}));

export const res_reservationsRelations = relations(res_reservations, ({one, many}) => ({
	order_items: many(order_items),
	program: one(programs, {
		fields: [res_reservations.program_id],
		references: [programs.id]
	}),
	resource: one(resources, {
		fields: [res_reservations.resource_id],
		references: [resources.id]
	}),
}));

export const user_permitsRelations = relations(user_permits, ({one, many}) => ({
	order_items: many(order_items),
	asset_app_identification_photo_id: one(assets, {
		fields: [user_permits.app_identification_photo_id],
		references: [assets.id],
		relationName: "user_permits_app_identification_photo_id_assets_id"
	}),
	asset_app_idnyc_photo_id: one(assets, {
		fields: [user_permits.app_idnyc_photo_id],
		references: [assets.id],
		relationName: "user_permits_app_idnyc_photo_id_assets_id"
	}),
	asset_app_permit_photo_id: one(assets, {
		fields: [user_permits.app_permit_photo_id],
		references: [assets.id],
		relationName: "user_permits_app_permit_photo_id_assets_id"
	}),
	invoice: one(invoices, {
		fields: [user_permits.invoice_id],
		references: [invoices.id]
	}),
	user_manual_fulfiller_id: one(users, {
		fields: [user_permits.manual_fulfiller_id],
		references: [users.id],
		relationName: "user_permits_manual_fulfiller_id_users_id"
	}),
	nyc_permit_account: one(nyc_permit_accounts, {
		fields: [user_permits.nyc_permit_account_id],
		references: [nyc_permit_accounts.id]
	}),
	nyc_permit_card: one(nyc_permit_cards, {
		fields: [user_permits.nyc_permit_card_id],
		references: [nyc_permit_cards.id]
	}),
	purchasable_permit: one(purchasable_permits, {
		fields: [user_permits.permit_id],
		references: [purchasable_permits.id]
	}),
	user_user_id: one(users, {
		fields: [user_permits.user_id],
		references: [users.id],
		relationName: "user_permits_user_id_users_id"
	}),
}));

export const user_program_packagesRelations = relations(user_program_packages, ({one, many}) => ({
	order_items: many(order_items),
	user_canceler_id: one(users, {
		fields: [user_program_packages.canceler_id],
		references: [users.id],
		relationName: "user_program_packages_canceler_id_users_id"
	}),
	org: one(orgs, {
		fields: [user_program_packages.org_id],
		references: [orgs.id]
	}),
	program_package: one(program_packages, {
		fields: [user_program_packages.program_package_id],
		references: [program_packages.id]
	}),
	user_purchaser_id: one(users, {
		fields: [user_program_packages.purchaser_id],
		references: [users.id],
		relationName: "user_program_packages_purchaser_id_users_id"
	}),
	user_user_id: one(users, {
		fields: [user_program_packages.user_id],
		references: [users.id],
		relationName: "user_program_packages_user_id_users_id"
	}),
	venue: one(venues, {
		fields: [user_program_packages.venue_id],
		references: [venues.id]
	}),
	user_program_package_items: many(user_program_package_items),
}));

export const shipping_addressesRelations = relations(shipping_addresses, ({one, many}) => ({
	orders: many(orders),
	user: one(users, {
		fields: [shipping_addresses.user_id],
		references: [users.id]
	}),
}));

export const org_membersRelations = relations(org_members, ({one}) => ({
	org: one(orgs, {
		fields: [org_members.org_id],
		references: [orgs.id]
	}),
	user: one(users, {
		fields: [org_members.user_id],
		references: [users.id]
	}),
}));

export const paymentsRelations = relations(payments, ({one, many}) => ({
	invoice: one(invoices, {
		fields: [payments.invoice_id],
		references: [invoices.id]
	}),
	payment_method: one(payment_methods, {
		fields: [payments.payment_method_id],
		references: [payment_methods.id]
	}),
	user: one(users, {
		fields: [payments.user_id],
		references: [users.id]
	}),
	refunds: many(refunds),
}));

export const payment_methodsRelations = relations(payment_methods, ({one, many}) => ({
	payments: many(payments),
	address: one(addresses, {
		fields: [payment_methods.billing_address_id],
		references: [addresses.id]
	}),
	user: one(users, {
		fields: [payment_methods.user_id],
		references: [users.id]
	}),
	subscriptions: many(subscriptions),
}));

export const player_profile_quizRelations = relations(player_profile_quiz, ({one}) => ({
	quiz: one(quizzes, {
		fields: [player_profile_quiz.quiz_id],
		references: [quizzes.id]
	}),
}));

export const quizzesRelations = relations(quizzes, ({many}) => ({
	player_profile_quizs: many(player_profile_quiz),
	quiz_submissions: many(quiz_submissions),
	quiz_questions: many(quiz_questions),
}));

export const windowsRelations = relations(windows, ({many}) => ({
	orgs: many(orgs),
	programs: many(programs),
	resources: many(resources),
	venues_default_program_registration_window_id: many(venues, {
		relationName: "venues_default_program_registration_window_id_windows_id"
	}),
	venues_default_res_availability_window_id: many(venues, {
		relationName: "venues_default_res_availability_window_id_windows_id"
	}),
}));

export const ott_auth_requestsRelations = relations(ott_auth_requests, ({one}) => ({
	user: one(users, {
		fields: [ott_auth_requests.user_id],
		references: [users.id]
	}),
}));

export const addressesRelations = relations(addresses, ({many}) => ({
	payment_methods: many(payment_methods),
	venues: many(venues),
}));

export const post_imagesRelations = relations(post_images, ({one}) => ({
	asset: one(assets, {
		fields: [post_images.image_id],
		references: [assets.id]
	}),
	post: one(posts, {
		fields: [post_images.post_id],
		references: [posts.id]
	}),
}));

export const pq_org_tagsRelations = relations(pq_org_tags, ({one}) => ({
	org_tag: one(org_tags, {
		fields: [pq_org_tags.org_tag_id],
		references: [org_tags.id]
	}),
	program_query: one(program_queries, {
		fields: [pq_org_tags.pq_id],
		references: [program_queries.id]
	}),
}));

export const pq_orgsRelations = relations(pq_orgs, ({one}) => ({
	org: one(orgs, {
		fields: [pq_orgs.org_id],
		references: [orgs.id]
	}),
	program_query: one(program_queries, {
		fields: [pq_orgs.pq_id],
		references: [program_queries.id]
	}),
}));

export const pq_participant_price_centsRelations = relations(pq_participant_price_cents, ({one}) => ({
	program_query: one(program_queries, {
		fields: [pq_participant_price_cents.pq_id],
		references: [program_queries.id]
	}),
}));

export const pq_programsRelations = relations(pq_programs, ({one}) => ({
	program_query: one(program_queries, {
		fields: [pq_programs.pq_id],
		references: [program_queries.id]
	}),
	program: one(programs, {
		fields: [pq_programs.program_id],
		references: [programs.id]
	}),
}));

export const pq_start_timesRelations = relations(pq_start_times, ({one}) => ({
	program_query: one(program_queries, {
		fields: [pq_start_times.pq_id],
		references: [program_queries.id]
	}),
}));

export const pro_shopsRelations = relations(pro_shops, ({one, many}) => ({
	pro_page: one(pro_pages, {
		fields: [pro_shops.pro_page_id],
		references: [pro_pages.id]
	}),
	pro_shop_items: many(pro_shop_items),
}));

export const pro_pagesRelations = relations(pro_pages, ({one, many}) => ({
	pro_shops: many(pro_shops),
	pro_page_images: many(pro_page_images),
	user: one(users, {
		fields: [pro_pages.user_id],
		references: [users.id]
	}),
}));

export const pq_typesRelations = relations(pq_types, ({one}) => ({
	program_query: one(program_queries, {
		fields: [pq_types.pq_id],
		references: [program_queries.id]
	}),
}));

export const pq_venuesRelations = relations(pq_venues, ({one}) => ({
	program_query: one(program_queries, {
		fields: [pq_venues.pq_id],
		references: [program_queries.id]
	}),
	venue: one(venues, {
		fields: [pq_venues.venue_id],
		references: [venues.id]
	}),
}));

export const pro_page_imagesRelations = relations(pro_page_images, ({one}) => ({
	asset: one(assets, {
		fields: [pro_page_images.asset_id],
		references: [assets.id]
	}),
	pro_page: one(pro_pages, {
		fields: [pro_page_images.pro_page_id],
		references: [pro_pages.id]
	}),
}));

export const pro_shop_item_imagesRelations = relations(pro_shop_item_images, ({one}) => ({
	asset: one(assets, {
		fields: [pro_shop_item_images.asset_id],
		references: [assets.id]
	}),
	pro_shop_item: one(pro_shop_items, {
		fields: [pro_shop_item_images.pro_shop_item_id],
		references: [pro_shop_items.id]
	}),
}));

export const pro_shop_itemsRelations = relations(pro_shop_items, ({one, many}) => ({
	pro_shop_item_images: many(pro_shop_item_images),
	pro_shop: one(pro_shops, {
		fields: [pro_shop_items.pro_shop_id],
		references: [pro_shops.id]
	}),
}));

export const product_imagesRelations = relations(product_images, ({one}) => ({
	asset: one(assets, {
		fields: [product_images.image_id],
		references: [assets.id]
	}),
	product: one(products, {
		fields: [product_images.product_id],
		references: [products.id]
	}),
}));

export const pq_namesRelations = relations(pq_names, ({one}) => ({
	program_query: one(program_queries, {
		fields: [pq_names.pq_id],
		references: [program_queries.id]
	}),
}));

export const pq_start_datesRelations = relations(pq_start_dates, ({one}) => ({
	program_query: one(program_queries, {
		fields: [pq_start_dates.pq_id],
		references: [program_queries.id]
	}),
}));

export const product_variant_imagesRelations = relations(product_variant_images, ({one}) => ({
	asset: one(assets, {
		fields: [product_variant_images.image_id],
		references: [assets.id]
	}),
	product_variant: one(product_variants, {
		fields: [product_variant_images.product_variant_id],
		references: [product_variants.id]
	}),
}));

export const product_variant_option_valuesRelations = relations(product_variant_option_values, ({one}) => ({
	product_variant: one(product_variants, {
		fields: [product_variant_option_values.product_variant_id],
		references: [product_variants.id]
	}),
	variant_option_value: one(variant_option_values, {
		fields: [product_variant_option_values.variant_option_value_id],
		references: [variant_option_values.id]
	}),
}));

export const variant_option_valuesRelations = relations(variant_option_values, ({one, many}) => ({
	product_variant_option_values: many(product_variant_option_values),
	variant_option: one(variant_options, {
		fields: [variant_option_values.variant_option_id],
		references: [variant_options.id]
	}),
}));

export const product_variant_stockRelations = relations(product_variant_stock, ({one}) => ({
	user: one(users, {
		fields: [product_variant_stock.creator_id],
		references: [users.id]
	}),
	order_item: one(order_items, {
		fields: [product_variant_stock.order_item_id],
		references: [order_items.id]
	}),
	product_variant: one(product_variants, {
		fields: [product_variant_stock.product_variant_id],
		references: [product_variants.id]
	}),
}));

export const program_internal_tagsRelations = relations(program_internal_tags, ({one}) => ({
	user: one(users, {
		fields: [program_internal_tags.creator_id],
		references: [users.id]
	}),
	internal_tag: one(internal_tags, {
		fields: [program_internal_tags.internal_tag_id],
		references: [internal_tags.id]
	}),
	program: one(programs, {
		fields: [program_internal_tags.program_id],
		references: [programs.id]
	}),
}));

export const program_package_itemsRelations = relations(program_package_items, ({one}) => ({
	beneficiary_group: one(beneficiary_groups, {
		fields: [program_package_items.beneficiary_group_id],
		references: [beneficiary_groups.id]
	}),
	program_package: one(program_packages, {
		fields: [program_package_items.program_package_id],
		references: [program_packages.id]
	}),
	program_query: one(program_queries, {
		fields: [program_package_items.query_id],
		references: [program_queries.id]
	}),
}));

export const program_packagesRelations = relations(program_packages, ({one, many}) => ({
	program_package_items: many(program_package_items),
	program_package_set: one(program_package_sets, {
		fields: [program_packages.set_id],
		references: [program_package_sets.id]
	}),
	user_program_packages: many(user_program_packages),
}));

export const program_package_setsRelations = relations(program_package_sets, ({one, many}) => ({
	program_packages: many(program_packages),
	org: one(orgs, {
		fields: [program_package_sets.org_id],
		references: [orgs.id]
	}),
	venue: one(venues, {
		fields: [program_package_sets.venue_id],
		references: [venues.id]
	}),
}));

export const program_postsRelations = relations(program_posts, ({one}) => ({
	post: one(posts, {
		fields: [program_posts.post_id],
		references: [posts.id]
	}),
	program: one(programs, {
		fields: [program_posts.program_id],
		references: [programs.id]
	}),
}));

export const promo_code_programsRelations = relations(promo_code_programs, ({one}) => ({
	program: one(programs, {
		fields: [promo_code_programs.program_id],
		references: [programs.id]
	}),
	promo_code: one(promo_codes, {
		fields: [promo_code_programs.promo_code_id],
		references: [promo_codes.id]
	}),
}));

export const program_attribute_settingsRelations = relations(program_attribute_settings, ({one}) => ({
	attribute: one(attributes, {
		fields: [program_attribute_settings.attribute_id],
		references: [attributes.id]
	}),
}));

export const program_attributesRelations = relations(program_attributes, ({one}) => ({
	attribute: one(attributes, {
		fields: [program_attributes.attribute_id],
		references: [attributes.id]
	}),
	attribute_value: one(attribute_values, {
		fields: [program_attributes.attribute_value_id],
		references: [attribute_values.id]
	}),
	program: one(programs, {
		fields: [program_attributes.program_id],
		references: [programs.id]
	}),
}));

export const program_imagesRelations = relations(program_images, ({one}) => ({
	asset: one(assets, {
		fields: [program_images.image_id],
		references: [assets.id]
	}),
	program: one(programs, {
		fields: [program_images.program_id],
		references: [programs.id]
	}),
}));

export const program_inclusionsRelations = relations(program_inclusions, ({one}) => ({
	program: one(programs, {
		fields: [program_inclusions.program_id],
		references: [programs.id]
	}),
}));

export const program_locationsRelations = relations(program_locations, ({one}) => ({
	location: one(locations, {
		fields: [program_locations.location_id],
		references: [locations.id]
	}),
	program: one(programs, {
		fields: [program_locations.program_id],
		references: [programs.id]
	}),
}));

export const program_productsRelations = relations(program_products, ({one}) => ({
	product: one(products, {
		fields: [program_products.product_id],
		references: [products.id]
	}),
	program: one(programs, {
		fields: [program_products.program_id],
		references: [programs.id]
	}),
}));

export const program_required_club_membershipsRelations = relations(program_required_club_memberships, ({one}) => ({
	club: one(clubs, {
		fields: [program_required_club_memberships.club_id],
		references: [clubs.id]
	}),
	program: one(programs, {
		fields: [program_required_club_memberships.program_id],
		references: [programs.id]
	}),
}));

export const program_tagsRelations = relations(program_tags, ({one}) => ({
	user: one(users, {
		fields: [program_tags.creator_id],
		references: [users.id]
	}),
	program: one(programs, {
		fields: [program_tags.program_id],
		references: [programs.id]
	}),
	org_tag: one(org_tags, {
		fields: [program_tags.tag_id],
		references: [org_tags.id]
	}),
}));

export const program_waitlist_usersRelations = relations(program_waitlist_users, ({one}) => ({
	program: one(programs, {
		fields: [program_waitlist_users.program_id],
		references: [programs.id]
	}),
	user: one(users, {
		fields: [program_waitlist_users.user_id],
		references: [users.id]
	}),
}));

export const promo_code_skusRelations = relations(promo_code_skus, ({one}) => ({
	promo_code: one(promo_codes, {
		fields: [promo_code_skus.promo_code_id],
		references: [promo_codes.id]
	}),
}));

export const promo_code_usersRelations = relations(promo_code_users, ({one}) => ({
	promo_code: one(promo_codes, {
		fields: [promo_code_users.promo_code_id],
		references: [promo_codes.id]
	}),
	user: one(users, {
		fields: [promo_code_users.user_id],
		references: [users.id]
	}),
}));

export const promo_code_usesRelations = relations(promo_code_uses, ({one}) => ({
	invoice: one(invoices, {
		fields: [promo_code_uses.invoice_id],
		references: [invoices.id]
	}),
	promo_code: one(promo_codes, {
		fields: [promo_code_uses.promo_code_id],
		references: [promo_codes.id]
	}),
	user: one(users, {
		fields: [promo_code_uses.user_id],
		references: [users.id]
	}),
}));

export const quiz_submission_answersRelations = relations(quiz_submission_answers, ({one}) => ({
	quiz_answer: one(quiz_answers, {
		fields: [quiz_submission_answers.answer_id],
		references: [quiz_answers.id]
	}),
	quiz_question: one(quiz_questions, {
		fields: [quiz_submission_answers.question_id],
		references: [quiz_questions.id]
	}),
	quiz_submission: one(quiz_submissions, {
		fields: [quiz_submission_answers.submission_id],
		references: [quiz_submissions.id]
	}),
}));

export const quiz_answersRelations = relations(quiz_answers, ({one, many}) => ({
	quiz_submission_answers: many(quiz_submission_answers),
	quiz_question: one(quiz_questions, {
		fields: [quiz_answers.question_id],
		references: [quiz_questions.id]
	}),
}));

export const quiz_questionsRelations = relations(quiz_questions, ({one, many}) => ({
	quiz_submission_answers: many(quiz_submission_answers),
	quiz: one(quizzes, {
		fields: [quiz_questions.quiz_id],
		references: [quizzes.id]
	}),
	quiz_answers: many(quiz_answers),
}));

export const quiz_submissionsRelations = relations(quiz_submissions, ({one, many}) => ({
	quiz_submission_answers: many(quiz_submission_answers),
	quiz: one(quizzes, {
		fields: [quiz_submissions.quiz_id],
		references: [quizzes.id]
	}),
	user: one(users, {
		fields: [quiz_submissions.user_id],
		references: [users.id]
	}),
}));

export const refundsRelations = relations(refunds, ({one}) => ({
	user: one(users, {
		fields: [refunds.initiator_id],
		references: [users.id]
	}),
	payment: one(payments, {
		fields: [refunds.payment_id],
		references: [payments.id]
	}),
}));

export const res_finite_schedulesRelations = relations(res_finite_schedules, ({one}) => ({
	resource: one(resources, {
		fields: [res_finite_schedules.resource_id],
		references: [resources.id]
	}),
	res_schedule: one(res_schedules, {
		fields: [res_finite_schedules.schedule_id],
		references: [res_schedules.id]
	}),
}));

export const res_schedulesRelations = relations(res_schedules, ({one, many}) => ({
	res_finite_schedules: many(res_finite_schedules),
	res_schedule_hours: many(res_schedule_hours),
	resources: many(resources),
	user: one(users, {
		fields: [res_schedules.creator_id],
		references: [users.id]
	}),
	venue: one(venues, {
		fields: [res_schedules.venue_id],
		references: [venues.id]
	}),
}));

export const res_special_hoursRelations = relations(res_special_hours, ({one}) => ({
	resource: one(resources, {
		fields: [res_special_hours.resource_id],
		references: [resources.id]
	}),
}));

export const res_schedule_hoursRelations = relations(res_schedule_hours, ({one}) => ({
	res_schedule: one(res_schedules, {
		fields: [res_schedule_hours.schedule_id],
		references: [res_schedules.id]
	}),
}));

export const role_permsRelations = relations(role_perms, ({one}) => ({
	perm: one(perms, {
		fields: [role_perms.perm],
		references: [perms.name]
	}),
	role: one(roles, {
		fields: [role_perms.role_id],
		references: [roles.id]
	}),
}));

export const permsRelations = relations(perms, ({many}) => ({
	role_perms: many(role_perms),
}));

export const rolesRelations = relations(roles, ({one, many}) => ({
	role_perms: many(role_perms),
	org: one(orgs, {
		fields: [roles.org_id],
		references: [orgs.id]
	}),
	subscription_provisions: many(subscription_provisions),
	user_roles: many(user_roles),
	subscription_plan_provisions: many(subscription_plan_provisions),
}));

export const saas_requestsRelations = relations(saas_requests, ({one}) => ({
	club: one(clubs, {
		fields: [saas_requests.club_id],
		references: [clubs.id]
	}),
	user: one(users, {
		fields: [saas_requests.requester_id],
		references: [users.id]
	}),
}));

export const res_typesRelations = relations(res_types, ({many}) => ({
	resources: many(resources),
}));

export const purchasable_permitsRelations = relations(purchasable_permits, ({many}) => ({
	user_permits: many(user_permits),
}));

export const subscription_provisionsRelations = relations(subscription_provisions, ({one}) => ({
	role: one(roles, {
		fields: [subscription_provisions.role_id],
		references: [roles.id]
	}),
	subscription: one(subscriptions, {
		fields: [subscription_provisions.subscription_id],
		references: [subscriptions.id]
	}),
}));

export const subscriptionsRelations = relations(subscriptions, ({one, many}) => ({
	subscription_provisions: many(subscription_provisions),
	subscription_invoices: many(subscription_invoices),
	payment_method: one(payment_methods, {
		fields: [subscriptions.payment_method_id],
		references: [payment_methods.id]
	}),
	subscription_plan: one(subscription_plans, {
		fields: [subscriptions.plan_id],
		references: [subscription_plans.id]
	}),
	user: one(users, {
		fields: [subscriptions.subscriber_id],
		references: [users.id]
	}),
}));

export const subscription_plansRelations = relations(subscription_plans, ({one, many}) => ({
	user: one(users, {
		fields: [subscription_plans.creator_id],
		references: [users.id]
	}),
	org: one(orgs, {
		fields: [subscription_plans.org_id],
		references: [orgs.id]
	}),
	subscriptions: many(subscriptions),
	subscription_plan_provisions: many(subscription_plan_provisions),
}));

export const user_interested_play_locationsRelations = relations(user_interested_play_locations, ({one}) => ({
	user: one(users, {
		fields: [user_interested_play_locations.user_id],
		references: [users.id]
	}),
}));

export const user_package_item_beneficiary_group_usesRelations = relations(user_package_item_beneficiary_group_uses, ({one}) => ({
	beneficiary_group_user: one(beneficiary_group_users, {
		fields: [user_package_item_beneficiary_group_uses.beneficiary_group_user_id],
		references: [beneficiary_group_users.id]
	}),
	user_program_package_item: one(user_program_package_items, {
		fields: [user_package_item_beneficiary_group_uses.user_package_item_id],
		references: [user_program_package_items.id]
	}),
}));

export const user_program_package_itemsRelations = relations(user_program_package_items, ({one, many}) => ({
	user_package_item_beneficiary_group_uses: many(user_package_item_beneficiary_group_uses),
	beneficiary_group: one(beneficiary_groups, {
		fields: [user_program_package_items.beneficiary_group_id],
		references: [beneficiary_groups.id]
	}),
	program_query: one(program_queries, {
		fields: [user_program_package_items.query_id],
		references: [program_queries.id]
	}),
	user_program_package: one(user_program_packages, {
		fields: [user_program_package_items.user_program_package_id],
		references: [user_program_packages.id]
	}),
	user_program_package_item_uses: many(user_program_package_item_uses),
}));

export const user_password_resetsRelations = relations(user_password_resets, ({one}) => ({
	user: one(users, {
		fields: [user_password_resets.user_id],
		references: [users.id]
	}),
}));

export const variant_optionsRelations = relations(variant_options, ({one, many}) => ({
	variant_option_values: many(variant_option_values),
	org: one(orgs, {
		fields: [variant_options.org_id],
		references: [orgs.id]
	}),
}));

export const user_settingsRelations = relations(user_settings, ({one}) => ({
	user: one(users, {
		fields: [user_settings.user_id],
		references: [users.id]
	}),
}));

export const subscription_invoicesRelations = relations(subscription_invoices, ({one}) => ({
	invoice: one(invoices, {
		fields: [subscription_invoices.invoice_id],
		references: [invoices.id]
	}),
	subscription: one(subscriptions, {
		fields: [subscription_invoices.subscription_id],
		references: [subscriptions.id]
	}),
}));

export const transfersRelations = relations(transfers, ({one}) => ({
	invoice: one(invoices, {
		fields: [transfers.invoice_id],
		references: [invoices.id]
	}),
	org: one(orgs, {
		fields: [transfers.org_id],
		references: [orgs.id]
	}),
}));

export const user_profile_attribute_settingsRelations = relations(user_profile_attribute_settings, ({one}) => ({
	attribute: one(attributes, {
		fields: [user_profile_attribute_settings.attribute_id],
		references: [attributes.id]
	}),
}));

export const user_profile_attributesRelations = relations(user_profile_attributes, ({one}) => ({
	attribute: one(attributes, {
		fields: [user_profile_attributes.attribute_id],
		references: [attributes.id]
	}),
	attribute_value: one(attribute_values, {
		fields: [user_profile_attributes.attribute_value_id],
		references: [attribute_values.id]
	}),
	user: one(users, {
		fields: [user_profile_attributes.user_id],
		references: [users.id]
	}),
}));

export const user_program_package_item_usesRelations = relations(user_program_package_item_uses, ({one}) => ({
	program_booking: one(program_bookings, {
		fields: [user_program_package_item_uses.booking_id],
		references: [program_bookings.id]
	}),
	user_program_package_item: one(user_program_package_items, {
		fields: [user_program_package_item_uses.user_package_item_id],
		references: [user_program_package_items.id]
	}),
}));

export const user_rolesRelations = relations(user_roles, ({one}) => ({
	user_creator_id: one(users, {
		fields: [user_roles.creator_id],
		references: [users.id],
		relationName: "user_roles_creator_id_users_id"
	}),
	role: one(roles, {
		fields: [user_roles.role_id],
		references: [roles.id]
	}),
	user_user_id: one(users, {
		fields: [user_roles.user_id],
		references: [users.id],
		relationName: "user_roles_user_id_users_id"
	}),
}));

export const user_sessionsRelations = relations(user_sessions, ({one}) => ({
	user: one(users, {
		fields: [user_sessions.user_id],
		references: [users.id]
	}),
}));

export const venue_homepage_faqsRelations = relations(venue_homepage_faqs, ({one}) => ({
	venue_homepage: one(venue_homepages, {
		fields: [venue_homepage_faqs.homepage_id],
		references: [venue_homepages.id]
	}),
}));

export const venue_homepagesRelations = relations(venue_homepages, ({one, many}) => ({
	venue_homepage_faqs: many(venue_homepage_faqs),
	user: one(users, {
		fields: [venue_homepages.creator_id],
		references: [users.id]
	}),
	venues: many(venues),
	venue_homepage_callouts: many(venue_homepage_callouts),
}));

export const venue_imagesRelations = relations(venue_images, ({one}) => ({
	asset: one(assets, {
		fields: [venue_images.image_id],
		references: [assets.id]
	}),
	venue: one(venues, {
		fields: [venue_images.venue_id],
		references: [venues.id]
	}),
}));

export const venue_lesson_requestsRelations = relations(venue_lesson_requests, ({one}) => ({
	venue_customer: one(venue_customers, {
		fields: [venue_lesson_requests.customer_id],
		references: [venue_customers.id]
	}),
	lesson_request: one(lesson_requests, {
		fields: [venue_lesson_requests.lesson_request_id],
		references: [lesson_requests.id]
	}),
	venue: one(venues, {
		fields: [venue_lesson_requests.venue_id],
		references: [venues.id]
	}),
}));

export const venue_customersRelations = relations(venue_customers, ({one, many}) => ({
	venue_lesson_requests: many(venue_lesson_requests),
	customer: one(customers, {
		fields: [venue_customers.org_customer_id],
		references: [customers.id]
	}),
	venue: one(venues, {
		fields: [venue_customers.venue_id],
		references: [venues.id]
	}),
}));

export const venue_team_membersRelations = relations(venue_team_members, ({one}) => ({
	user: one(users, {
		fields: [venue_team_members.user_id],
		references: [users.id]
	}),
	venue: one(venues, {
		fields: [venue_team_members.venue_id],
		references: [venues.id]
	}),
}));

export const venue_available_lessonsRelations = relations(venue_available_lessons, ({one}) => ({
	venue: one(venues, {
		fields: [venue_available_lessons.venue_id],
		references: [venues.id]
	}),
}));

export const venue_open_hoursRelations = relations(venue_open_hours, ({one}) => ({
	venue: one(venues, {
		fields: [venue_open_hours.venue_id],
		references: [venues.id]
	}),
}));

export const asset_delete_queueRelations = relations(asset_delete_queue, ({one}) => ({
	asset: one(assets, {
		fields: [asset_delete_queue.asset_id],
		references: [assets.id]
	}),
}));

export const cec_emailsRelations = relations(cec_emails, ({one}) => ({
	cec: one(cecs, {
		fields: [cec_emails.cec_id],
		references: [cecs.id]
	}),
}));

export const pq_start_dowsRelations = relations(pq_start_dows, ({one}) => ({
	program_query: one(program_queries, {
		fields: [pq_start_dows.pq_id],
		references: [program_queries.id]
	}),
}));

export const program_sponsorsRelations = relations(program_sponsors, ({one}) => ({
	program: one(programs, {
		fields: [program_sponsors.program_id],
		references: [programs.id]
	}),
	sponsor: one(sponsors, {
		fields: [program_sponsors.sponsor_id],
		references: [sponsors.id]
	}),
}));

export const subscription_plan_provisionsRelations = relations(subscription_plan_provisions, ({one}) => ({
	subscription_plan: one(subscription_plans, {
		fields: [subscription_plan_provisions.plan_id],
		references: [subscription_plans.id]
	}),
	role: one(roles, {
		fields: [subscription_plan_provisions.role_id],
		references: [roles.id]
	}),
}));

export const venue_homepage_calloutsRelations = relations(venue_homepage_callouts, ({one}) => ({
	venue_homepage: one(venue_homepages, {
		fields: [venue_homepage_callouts.homepage_id],
		references: [venue_homepages.id]
	}),
	asset: one(assets, {
		fields: [venue_homepage_callouts.image_id],
		references: [assets.id]
	}),
}));