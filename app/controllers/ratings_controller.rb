class RatingsController < ApplicationController
  def create
    # POST /ratings
    # params: yelp_id, value
    restaurant = Restaurant.find_by(yelp_id: rating_params[:yelp_id])
    unless restaurant
      restaurant = Restaurant.new(yelp_id: rating_params[:yelp_id])
      render json: { error: 'Could not create Restaurant' } unless restaurant.save
    end

    user_id = decoded_token[0]['user_id'].to_i
    rating = restaurant.ratings.new(user_id: user_id, value: rating_params[:value])
    if rating.save
      render json: RatingSerializer.new(rating)
      # returns rating value as json to add to component state to update UI that user has rated the restaurant
    else
      render json: { error: 'Could not save rating' }
    end
  end

  # PUT /ratings
  # params: restaurant_id, value
  def update
    user_id = decoded_token[0]['user_id'].to_i
    restaurant_id = rating_params[:restaurant_id]
    rating = Rating.find_by(restaurant_id: restaurant_id, user_id: user_id)
    rating.value = rating_params[:value]
    if rating.save
      render json: RatingSerializer.new(rating)
    else
      render json: { error: 'Could not update rating' }
    end
  end

  private

  def rating_params
    params.require(:rating).permit(:value, :yelp_id, :restaurant_id)
  end
end
