class AddLookupAvailableDateToDomains < ActiveRecord::Migration
  def change
    add_column :domains, :lookup_available_date, :string
  end
end
