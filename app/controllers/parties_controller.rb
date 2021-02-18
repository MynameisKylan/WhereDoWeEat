class PartiesController < ApplicationController
  # Aggregate ratings of given party
  def search
    users = User.where(username: party_params[:party])
    user_ids = users.map { |user| user.id }
    ratings = Rating.where(user_id: user_ids)
    restaurant_ids = ratings.map { |rating| rating.restaurant_id }
    restaurants = Restaurant.where(id: restaurant_ids).map do |restaurant|
      ratings = restaurant.ratings
      count = ratings.count
      avg_rating = ratings.average(:value)
      # https://math.stackexchange.com/questions/942738/algorithm-to-calculate-rating-based-on-multiple-reviews-using-both-review-score
      weighted_rating = (0.5 * avg_rating + 2.5 * (1 - 2.71828**(-1 * count.to_f / 3))).to_f.round(1)
      { yelp_id: restaurant.yelp_id,
        weighted_rating: weighted_rating }
    end
    sorted = restaurants.sort_by { |restaurant| restaurant[:weighted_rating] }.reverse
    render json: sorted
  end

  private

  def party_params
    params.permit(party: [])
  end
end
