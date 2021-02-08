class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :recoverable, :validatable

  after_create :update_access_token!

  has_many :forward_friendships, class_name: 'Friendship', foreign_key: :user_id
  has_many :forward_friends, through: :forward_friendships, source: :friend
  has_many :inverse_friendships, class_name: 'Friendship', foreign_key: :friend_id
  has_many :inverse_friends, through: :inverse_friendships, source: :user

  def friends
    forward_friends + inverse_friends
  end

  private

  def update_access_token!
    self.access_token = "#{self.id}:#{Devise.friendly_token}"
  end
end
