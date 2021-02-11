class SessionsController < Devise::SessionsController
  skip_before_action :authenticate_user_from_token!

  # Rails looks in same namespace for serializers (ex: serializers/session_serializer.rb)
  def respond_with(resource, opts = {})
    render json: SessionSerializer.new(resource).serializable_hash.to_json
  end
end