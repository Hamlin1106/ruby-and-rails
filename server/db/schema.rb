# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_07_07_141308) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "codes", force: :cascade do |t|
    t.bigint "line_id", null: false
    t.string "name", null: false, comment: "品番名称"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["line_id"], name: "index_codes_on_line_id"
  end

  create_table "factories", force: :cascade do |t|
    t.string "name", null: false, comment: "工場名称"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "line_errors", force: :cascade do |t|
    t.bigint "line_id", null: false
    t.string "name", null: false, comment: "異常名称"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["line_id"], name: "index_line_errors_on_line_id"
  end

  create_table "line_users", force: :cascade do |t|
    t.bigint "line_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["line_id"], name: "index_line_users_on_line_id"
    t.index ["user_id"], name: "index_line_users_on_user_id"
  end

  create_table "lines", force: :cascade do |t|
    t.bigint "factory_id", null: false
    t.bigint "product_id", null: false
    t.string "name", null: false, comment: "ライン名称"
    t.float "takt", comment: "ラインタクト"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["factory_id"], name: "index_lines_on_factory_id"
    t.index ["product_id"], name: "index_lines_on_product_id"
  end

  create_table "products", force: :cascade do |t|
    t.bigint "factory_id", null: false
    t.string "name", null: false, comment: "製品名称"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["factory_id"], name: "index_products_on_factory_id"
  end

  create_table "report_daily_line_codes", force: :cascade do |t|
    t.bigint "line_id", null: false
    t.bigint "code_id", null: false
    t.date "date", null: false, comment: "日付"
    t.integer "count", comment: "生産数"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code_id"], name: "index_report_daily_line_codes_on_code_id"
    t.index ["line_id"], name: "index_report_daily_line_codes_on_line_id"
  end

  create_table "report_errors", force: :cascade do |t|
    t.bigint "line_id", null: false
    t.bigint "line_error_id", null: false
    t.date "date", null: false, comment: "日付"
    t.integer "count", comment: "停止回数"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["line_error_id"], name: "index_report_errors_on_line_error_id"
    t.index ["line_id"], name: "index_report_errors_on_line_id"
  end

  create_table "report_line_plans", force: :cascade do |t|
    t.bigint "line_id", null: false
    t.bigint "code_id", null: false
    t.date "date", null: false, comment: "日付"
    t.integer "plan", comment: "計画数"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code_id"], name: "index_report_line_plans_on_code_id"
    t.index ["line_id"], name: "index_report_line_plans_on_line_id"
  end

  create_table "report_line_takts", force: :cascade do |t|
    t.bigint "line_id", null: false
    t.bigint "code_id", null: false
    t.date "date", null: false, comment: "日付"
    t.float "takt", comment: "タクト"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code_id"], name: "index_report_line_takts_on_code_id"
    t.index ["line_id"], name: "index_report_line_takts_on_line_id"
  end

  create_table "report_line_times", force: :cascade do |t|
    t.bigint "line_id", null: false
    t.bigint "code_id", null: false
    t.date "date", null: false, comment: "日付"
    t.integer "time", comment: "加工時間"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code_id"], name: "index_report_line_times_on_code_id"
    t.index ["line_id"], name: "index_report_line_times_on_line_id"
  end

  create_table "search_conditions", force: :cascade do |t|
    t.string "name", null: false, comment: "名称"
    t.integer "report_type", null: false, comment: "レポート種別"
    t.date "date_from", comment: "日付from"
    t.date "date_to", comment: "日付to"
    t.string "month_from", comment: "月from"
    t.string "month_to", comment: "月to"
    t.string "month", comment: "月"
    t.string "line_ids", comment: "ラインID", array: true
    t.string "code_ids", comment: "品番", array: true
    t.boolean "is_standard", comment: "基準値使用"
    t.integer "standard", comment: "基準値"
    t.boolean "is_avarage", comment: "平均値使用"
    t.boolean "except_zero", comment: "ゼロ除外"
    t.string "font_size", comment: "フォントサイズ"
    t.integer "position", null: false, comment: "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "last_name", null: false, comment: "姓"
    t.string "first_name", null: false, comment: "名"
    t.string "email", comment: "email"
    t.string "password", null: false, comment: "パスワード"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.integer "role", default: 0, null: false, comment: "権限"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "codes", "lines"
  add_foreign_key "line_errors", "lines"
  add_foreign_key "line_users", "lines"
  add_foreign_key "line_users", "users"
  add_foreign_key "lines", "factories"
  add_foreign_key "lines", "products"
  add_foreign_key "products", "factories"
  add_foreign_key "report_daily_line_codes", "codes"
  add_foreign_key "report_daily_line_codes", "lines"
  add_foreign_key "report_errors", "line_errors"
  add_foreign_key "report_errors", "lines"
  add_foreign_key "report_line_plans", "codes"
  add_foreign_key "report_line_plans", "lines"
  add_foreign_key "report_line_takts", "codes"
  add_foreign_key "report_line_takts", "lines"
  add_foreign_key "report_line_times", "codes"
  add_foreign_key "report_line_times", "lines"
end
