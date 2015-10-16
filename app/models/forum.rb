class Forum < ActiveRecord::Base
    has_many :resposts, dependent: :destroy
end
