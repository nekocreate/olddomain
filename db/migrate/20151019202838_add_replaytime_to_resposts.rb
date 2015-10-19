class AddReplaytimeToResposts < ActiveRecord::Migration
  def change
    add_column :resposts, :replaytime, :timestamp
  end
end
