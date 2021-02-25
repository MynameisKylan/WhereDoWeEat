class UsersController < ApplicationController
  def show
    render json: UserSerializer.new(User.find(decoded_token[0]['user_id'].to_i)).serializable_hash.to_json
  end

  def destroy
    user = User.find(decoded_token[0]['user_id'].to_i)
    user.destroy
    render json: { status: :ok}
  end
end