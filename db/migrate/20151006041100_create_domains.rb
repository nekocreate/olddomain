class CreateDomains < ActiveRecord::Migration
  def change
    create_table :domains do |t|
      t.string :name
      t.integer :pr
      t.string :wayback
      t.string :seocheki
      t.string :index_count
      t.string :dofollow_pr
      t.string :nofollow_pr
      t.string :awy
      t.string :china
      t.string :ip_bunsanritsu
      t.string :ip_unique_count
      t.string :ip_all_count
      t.string :moz_rank
      t.string :moz_da
      t.string :moz_pa

      t.timestamps null: false
      
      t.index :name, unique: true
    end
  end
end
