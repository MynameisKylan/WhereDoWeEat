# Not used

module V1
  class SessionSerializer
    include JSONAPI::Serializer

    attributes :email, :access_token

    attribute :token_type do
      'Bearer'
    end
  end
end
