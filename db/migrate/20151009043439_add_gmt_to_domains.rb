class AddGmtToDomains < ActiveRecord::Migration
  def change
    add_column :domains, :gmt, :string
  end
end
