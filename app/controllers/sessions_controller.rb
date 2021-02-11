class SessionsController < Devise::SessionsController
  skip_before_action :authorized

  # Rails looks in same namespace for serializers (ex: serializers/session_serializer.rb)
  def respond_with(resource, opts = {})
    token = encode_token({ user_id: resource.id })
    render json: { user: resource, token: token }
  end
end