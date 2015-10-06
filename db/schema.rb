# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151006041100) do

  create_table "domains", force: :cascade do |t|
    t.string   "name"
    t.integer  "pr"
    t.string   "wayback"
    t.string   "seocheki"
    t.string   "index_count"
    t.string   "dofollow_pr"
    t.string   "nofollow_pr"
    t.string   "awy"
    t.string   "china"
    t.string   "ip_bunsanritsu"
    t.string   "ip_unique_count"
    t.string   "ip_all_count"
    t.string   "moz_rank"
    t.string   "moz_da"
    t.string   "moz_pa"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "domains", ["name"], name: "index_domains_on_name", unique: true

end
