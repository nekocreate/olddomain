class Forum < ActiveRecord::Base
    has_many :resposts, dependent: :destroy
    has_many :replayposts, dependent: :destroy
end
