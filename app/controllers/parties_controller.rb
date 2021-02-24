class PartiesController < ApplicationController
  # Aggregate ratings of given party and return sorted restaurant data
  def search
    users = User.where(username: party_params[:party])
    user_ids = users.map(&:id)
    ratings = Rating.where(user_id: user_ids)
    restaurant_ids = ratings.map(&:restaurant_id).uniq

    sorted = ordered_restaurant_ratings(restaurant_ids, user_ids)

    yelp_ids = sorted.map { |res| res[:yelp_id] }
    query_string = build_query_string(yelp_ids)

    resp = Faraday.post('https://api.yelp.com/v3/graphql') do |req|
      req.headers['Authorization'] = "Bearer #{ENV['yelp_key']}"
      req.headers['Content-Type'] = 'application/graphql'
      req.body = query_string
    end

    append_data(resp, sorted)

    result = party_params[:location].empty? ? sorted : filter_by_location(sorted, party_params[:location])

    render json: result
  end

  private

  def party_params
    params.permit(:location, party: [])
  end

  # Sort restaurants by calculated weighted rating
  def ordered_restaurant_ratings(id_list, user_ids)
    restaurants = Restaurant.where(id: id_list).map do |restaurant|
      ratings = Rating.where(restaurant_id: restaurant.id, user_id: user_ids) #restaurant.ratings
      count = ratings.count
      big_q = user_ids.length
      avg_rating = ratings.average(:value)
      # https://math.stackexchange.com/questions/942738/algorithm-to-calculate-rating-based-on-multiple-reviews-using-both-review-score
      weighted_rating = user_ids.length == 1 ? avg_rating : (0.8 * avg_rating + 5 * 0.2 * (1 - 2.71828**(-1 * count.to_f / big_q))).to_f.round(1)
      { yelp_id: restaurant.yelp_id,
        weighted_rating: weighted_rating }
    end
    restaurants.sort_by { |restaurant| restaurant[:weighted_rating] }.reverse
  end

  def build_query_string(id_list)
    graphql_fragment = ' fragment basicInfo on Business { name price photos categories {title} coordinates {latitude longitude} }'
    graphql_query = ''
    id_list.each.with_index do |id, idx|
      graphql_query += " b#{idx}: business(id: \"#{id}\") { ...basicInfo }"
    end

    '{' + graphql_query + ' }' + graphql_fragment
  end

  # mutates input list
  def append_data(query_response, sorted_restaurant_list)
    data = JSON.parse(query_response.body)['data']
    sorted_restaurant_list.each.with_index do |res, idx|
      res['data'] = data["b#{idx}"]
    end
  end

  def filter_by_location(restaurant_list, location)
    user_coords = Geocoder.search(location).first.coordinates

    restaurant_list.filter do |res|
      res_coords = [res['data']['coordinates']['latitude'], res['data']['coordinates']['longitude']]
      distance = Geocoder::Calculations.distance_between(user_coords, res_coords)
      distance < 6
    end
  end
end
