class AddHandlenameToUsers < ActiveRecord::Migration
  def change
    add_column :users, :handlename, :string
  end
end
