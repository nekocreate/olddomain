class CreateResposts < ActiveRecord::Migration
  def change
    create_table :resposts do |t|
      t.references :forum, index: true
      t.references :user, index: true
      t.string :title
      t.text :content

      t.timestamps null: false
      
      t.index [:forum_id, :user_id, :created_at]
    end
  end
end
