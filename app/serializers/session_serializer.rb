class SessionSerializer
  include JSONAPI::Serializer

  attributes :email

  attribute :token_type do
    'Bearer'
  end
end
