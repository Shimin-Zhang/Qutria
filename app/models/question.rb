class Question < ActiveRecord::Base
  validates :user, :title, :body, presence: true
  validates :title, uniqueness: true

  belongs_to :user, inverse_of: :questions
  has_many :answers, inverse_of: :question

end