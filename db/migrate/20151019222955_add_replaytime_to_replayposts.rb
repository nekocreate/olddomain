class AddReplaytimeToReplayposts < ActiveRecord::Migration
  def change
    add_column :replayposts, :replaytime, :timestamp
  end
end
