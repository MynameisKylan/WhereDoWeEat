# Not currently used in routes

module V1
  class SessionsController < ApplicationController
    skip_before_action :authorized

    # POST /v1/login
    def create
      @user = User.find_for_database_authentication(email: params[:email])
      return invalid_login_attempt unless @user

      if @user.valid_password?(params[:password])
        sign_in(:user, @user)
        render json: SessionSerializer.new(@user).serializable_hash.to_json
      else
        invalid_login_attempt
      end
    end

    private

    def invalid_login_attempt
      warden.custom_failure!
      render json: { error: 'sessions_controller.invalid_login_attempt' }, status: :unprocessable_entity
    end

  end
end