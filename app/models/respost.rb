class Respost < ActiveRecord::Base
  belongs_to :forum
  belongs_to :user
  has_many :replayposts, dependent: :destroy
  validates :forum_id, presence: true
  validates :user_id, presence: true
  validates :title, presence: true, length: { maximum: 50 }
  validates :content, presence: true, length: { maximum: 140 }
end
