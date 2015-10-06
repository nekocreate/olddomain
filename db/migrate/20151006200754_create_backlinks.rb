class CreateBacklinks < ActiveRecord::Migration
  def change
    create_table :backlinks do |t|
      t.string :domain
      t.string :pr
      t.string :ip
      t.string :followcheck
      t.string :obl
      t.string :bl_url
      t.string :bl_title
      t.string :anchor_text
      t.string :href_url

      t.timestamps null: false
    end
  end
end
