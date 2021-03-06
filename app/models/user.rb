class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :recoverable, :validatable, :registerable

  has_many :ratings
  has_many :rated_restaurants, through: :ratings, source: :restaurant

  has_many :forward_friendships, class_name: 'Friendship', foreign_key: :user_id
  has_many :forward_friends, through: :forward_friendships, source: :friend
  has_many :inverse_friendships, class_name: 'Friendship', foreign_key: :friend_id
  has_many :inverse_friends, through: :inverse_friendships, source: :user

  def friends
    forward_friends + inverse_friends
  end
end
