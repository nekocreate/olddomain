class CreateReplayposts < ActiveRecord::Migration
  def change
    create_table :replayposts do |t|
      t.references :respost, index: true
      t.references :forum, index: true
      t.references :user, index: true
      t.string :title
      t.text :content

      t.timestamps null: false
      
      t.index [:respost_id, :forum_id, :user_id]
    end
  end
end
