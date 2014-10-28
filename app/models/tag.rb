class Tag < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true, length: { minimum: 2 }

  has_many :taggables
  has_many :questions, through: :taggables, source: :tagging
  has_many :favorited_users, through: :taggables, source: :tagging
end
