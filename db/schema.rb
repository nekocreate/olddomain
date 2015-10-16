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

ActiveRecord::Schema.define(version: 20151016035500) do

  create_table "admin_users", force: :cascade do |t|
    t.string   "email",               default: "", null: false
    t.string   "encrypted_password",  default: "", null: false
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",       default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

  add_index "admin_users", ["email"], name: "index_admin_users_on_email", unique: true

  create_table "backlinks", force: :cascade do |t|
    t.string   "domain"
    t.string   "pr"
    t.string   "ip"
    t.string   "followcheck"
    t.string   "obl"
    t.string   "bl_url"
    t.string   "bl_title"
    t.string   "anchor_text"
    t.string   "href_url"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

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
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.string   "ngcheck"
    t.string   "lookup_available_date"
    t.string   "gmt"
  end

  add_index "domains", ["name"], name: "index_domains_on_name", unique: true

  create_table "forums", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "resposts", force: :cascade do |t|
    t.integer  "forum_id"
    t.integer  "user_id"
    t.string   "title"
    t.text     "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "resposts", ["forum_id", "user_id", "created_at"], name: "index_resposts_on_forum_id_and_user_id_and_created_at"
  add_index "resposts", ["forum_id"], name: "index_resposts_on_forum_id"
  add_index "resposts", ["user_id"], name: "index_resposts_on_user_id"

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.integer  "failed_attempts",        default: 0,     null: false
    t.string   "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "handlename"
    t.boolean  "admin",                  default: false
    t.boolean  "promember",              default: false
    t.string   "provider"
    t.string   "uid"
    t.string   "username"
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["provider"], name: "index_users_on_provider"
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  add_index "users", ["uid"], name: "index_users_on_uid"
  add_index "users", ["unlock_token"], name: "index_users_on_unlock_token", unique: true

end
