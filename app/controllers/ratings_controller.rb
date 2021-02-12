class RatingsController < ApplicationController
  def create
    # React form will submit post request with yelp_id and value params
    restaurant = Restaurant.find_by(yelp_id: rating_params[:yelp_id])
    p rating_params[:yelp_id]
    p restaurant
    user = User.find(decoded_token[0]['user_id'].to_i)
    rating = restaurant.ratings.new(user_id: user.id, value: rating_params[:value])
    if rating.save
      render json: RatingSerializer.new(rating)
      # returns rating value as json to add to component state to update UI that user has rated the restaurant
    else
      render json: { error: 'Could not save rating' }
    end
  end

  private

  def rating_params
    params.require(:rating).permit(:value, :yelp_id)
  end
end
