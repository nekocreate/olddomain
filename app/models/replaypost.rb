class Replaypost < ActiveRecord::Base
  belongs_to :respost
  belongs_to :forum
  belongs_to :user
  validates :forum_id, presence: true
  validates :user_id, presence: true
  validates :title, presence: true, length: { maximum: 53 } # 返信のタイトルにはformのvalueでRe:を付けているため、3文字分多めに許可する
  validates :content, presence: true, length: { maximum: 140 }
end
