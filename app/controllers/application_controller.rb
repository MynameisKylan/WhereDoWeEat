class ApplicationController < ActionController::API
  before_action :authorized
  before_action :configure_permitted_parameters, if: :devise_controller?

  def encode_token(payload)
    JWT.encode(payload, ENV['jwt_secret'])
  end

  def decoded_token
    auth_header = request.authorization
    if auth_header
      token = auth_header#.split(' ')[1]
      begin
        JWT.decode(token, ENV['jwt_secret'], true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  # def authenticate_user_from_token!
  #   auth_header = request.authorization

  #   if auth_token
  #     token = auth_header.split(' ')[1]
  #     authenticate_with_auth_token(token)
  #   else
  #     authentication_error
  #   end
  # end

  protected def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  end

  private

  def logged_in_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find(user_id)
    end
  end

  def logged_in?
    !!logged_in_user
  end

  def authorized
    render json: { error: 'Unauthorized. Please log in' }, status: :unauthorized unless logged_in?
  end

  # def authenticate_with_auth_token(auth_token)
  #   user_id = auth_token.split(':').first
  #   user = User.where(id: user_id).first

  #   if user && Devise.secure_compare(user.access_token, auth_token)
  #     # user can access
  #     sign_in(user, store: false) # don't know what store: false does yet
  #   else
  #     authentication_error
  #   end
  # end

  # # Authentication Failure
  # # Renders a 401 error
  # def authentication_error
  #   # User's token is either invalid or not the right format
  #   render json: { error: 'Unauthorized' }, status: 401 # Authentication timeout
  # end
end
