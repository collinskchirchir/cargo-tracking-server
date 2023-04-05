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

ActiveRecord::Schema[7.0].define(version: 2023_03_28_145959) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "packages", force: :cascade do |t|
    t.decimal "height"
    t.decimal "width"
    t.decimal "depth"
    t.decimal "cost"
    t.boolean "paid_status", default: false, null: false
    t.string "comment"
    t.string "email"
    t.string "full_name"
    t.string "phone_contact"
    t.boolean "is_received", default: false, null: false
    t.bigint "user_id", null: false
    t.bigint "shipment_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shipment_id"], name: "index_packages_on_shipment_id"
    t.index ["user_id"], name: "index_packages_on_user_id"
  end

  create_table "shipments", force: :cascade do |t|
    t.string "origin"
    t.string "destination"
    t.string "departure"
    t.string "arrival"
    t.string "rate_per_cbm"
    t.string "status"
    t.integer "container_size_in_feet"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trackings", force: :cascade do |t|
    t.string "package_status"
    t.string "location"
    t.string "comment"
    t.date "expected_arrival"
    t.bigint "shipment_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shipment_id"], name: "index_trackings_on_shipment_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password"
    t.boolean "is_admin", default: false, null: false
    t.string "first_name"
    t.string "last_name"
    t.string "address"
    t.string "country"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "packages", "shipments"
  add_foreign_key "packages", "users"
  add_foreign_key "trackings", "shipments"
end
