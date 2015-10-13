class AddPromemberToUsers < ActiveRecord::Migration
  def change
    add_column :users, :promember, :boolean, default: false
  end
end
