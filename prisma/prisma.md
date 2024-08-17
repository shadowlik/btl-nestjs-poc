*** WARNING ***

The following models were ignored as they do not have a valid unique identifier or id. This is currently not supported by Prisma Client:
  - "btl_org"
  - "player_profile_quiz"
  - "pro_page_images"
  - "pro_shop_item_images"
  - "promo_code_programs"
  - "promo_code_users"

These constraints are not supported by Prisma Client, because Prisma currently does not fully support check constraints. Read more: https://pris.ly/d/check-constraints
  - Model: "btl_org", constraint: "single_row_uniq"
  - Model: "pq_names", constraint: "pq_names_op_ck"
  - Model: "pq_org_tags", constraint: "pq_org_tags_op_ck"
  - Model: "pq_orgs", constraint: "pq_orgs_op_ck"
  - Model: "pq_participant_price_cents", constraint: "pq_participant_price_cents_op_ck"
  - Model: "pq_start_dates", constraint: "pq_start_dates_op_ck"
  - Model: "pq_start_dows", constraint: "pq_start_dows_dow_ck"
  - Model: "pq_start_dows", constraint: "pq_start_dows_op_ck"
  - Model: "pq_start_times", constraint: "pq_start_times_op_ck"
  - Model: "pq_types", constraint: "pq_types_op_ck"
  - Model: "pq_venues", constraint: "pq_venues_op_ck"
  - Model: "program_package_sets", constraint: "only_one_org_or_venue"
  - Model: "user_program_packages", constraint: "only_one_org_or_venue"

These indexes are not supported by Prisma Client, because Prisma currently does not fully support expression indexes. Read more: https://pris.ly/d/expression-indexes
  - Model: "clubs", constraint: "clubs_sid_uk"