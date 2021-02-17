class FriendshipsController < ApplicationController
  # Get user's friends
  def show
    current_user = User.find(decoded_token[0]['user_id'])
    render json: current_user.forward_friends.map { |friend| friend.username }
  end

  # Add friend
  def create
    user_id = decoded_token[0]['user_id']
    friend = User.where('lower(username) LIKE ?', friendship_params[:username].downcase).first
    if friend && friend.id != user_id
      friendship = Friendship.find_by(user_id: user_id, friend_id: friend.id)
      if friendship
        render json: { message: 'You are already friends with this user.' }
        return
      else
        friendship = Friendship.new(user_id: user_id, friend_id: friend.id)
      end

      if friendship.save
        render json: UserSerializer.new(friend).serializable_hash.to_json
        return
      else
        message = 'Could not add friend.'
      end
    elsif friend.id == user_id
      message = 'You cannot friend yourself.'
    else
      message = 'No user found with that username.'
    end

    render json: { message: message }
  end

  # Remove friend
  def remove
    friend = User.find_by(username: friendship_params[:username])
    friendship = Friendship.find_by(user_id: decoded_token[0]['user_id'], friend_id: friend.id)
    friendship.destroy
    render json: { message: 'Removed Friend.' }
  end

  private

  def friendship_params
    params.require(:friend).permit(:username)
  end
end
