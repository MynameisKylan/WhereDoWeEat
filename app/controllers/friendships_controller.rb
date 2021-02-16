class FriendshipsController < ApplicationController
  def create
    user_id = decoded_token[0]['user_id']
    friend = User.find_by(username: friendship_params[:username])
    if friend
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
    else
      message = 'No user found with that username.'
    end

    render json: { message: message }
  end

  def friendship_params
    params.require(:friend).permit(:username)
  end
end
