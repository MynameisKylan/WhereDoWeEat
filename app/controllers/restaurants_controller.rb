class RestaurantsController < ApplicationController
  def search
    url = "https://api.yelp.com/v3/businesses/search?term=#{search_params[:term]}&location=#{search_params[:location]}&categories=food"
    resp = Faraday.get(url) do |req|
      req.headers['Authorization'] = "Bearer #{ENV['yelp_key']}"
    end
    user_id = decoded_token[0]['user_id']
    body = JSON.parse(resp.body)
    if body['error']
      render json: { error: body['error']['description'] }
    else
      restaurants = body['businesses'].map do |restaurant|
        restaurant_entry = Restaurant.find_by(yelp_id: restaurant['id'])
        rating = Rating.find_by(user_id: user_id, restaurant_id: restaurant_entry.id) if restaurant_entry
        restaurant['user_rating'] = rating.value if rating
        restaurant
      end
      render json: restaurants
    end
  end

  private

  def search_params
    params.require(:search).permit(:term, :location)
  end
end
