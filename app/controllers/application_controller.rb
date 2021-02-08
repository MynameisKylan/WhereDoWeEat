class ApplicationController < ActionController::API
  before_action :authenticate_user_from_token!

  def authenticate_user_from_token!
    auth_token = request.header['Authorization']

    if auth_token
      authenticate_with_auth_token(auth_token)
    else
      authentication_error
    end
  end

  private

  def authenticate_with_auth_token(auth_token)
    unless auth_token.include?(':')
      authentication_error
      return
    end

    user_id = auth_token.split(':').first
    user = User.where(id: user_id).first

    if user && Devise.secure_compare(user.access_token, auth_token)
      # user can access
      sign_in(user, store: false) # don't know what store: false does yet
    else
      authentication_error
    end
  end

  # Authentication Failure
  # Renders a 401 error
  def authentication_error
    # User's stoken is either invalid or not the right format
    render json: {error: 'unauthorized'}, status: 401 # Authentication timeout
  end
end
