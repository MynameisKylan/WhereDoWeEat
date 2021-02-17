class FriendshipsController < ApplicationController
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
        message = "#{friend.username} added as friend."
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

  def friendship_params
    params.require(:friend).permit(:username)
  end
end
