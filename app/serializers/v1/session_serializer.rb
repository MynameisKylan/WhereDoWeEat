module V1
  class SessionSerializer
    include JSONAPI::Serializer

    attributes :email
    attribute(&:access_token)
    attribute(&:id)

    attribute :token_type do
      'Bearer'
    end
  end
end
