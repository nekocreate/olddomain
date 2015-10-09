class AddNgcheckToDomains < ActiveRecord::Migration
  def change
    add_column :domains, :ngcheck, :string
  end
end
