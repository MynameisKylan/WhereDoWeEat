class RatingSerializer
  include JSONAPI::Serializer

  attributes :value, :restaurant_id
end
