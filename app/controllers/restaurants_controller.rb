class RestaurantsController < ApplicationController
  def search
    url = "https://api.yelp.com/v3/businesses/search?term=#{search_params[:term]}&location=#{search_params[:location]}"
    resp = Faraday.get(url) do |req|
      req.headers['Authorization'] = "Bearer #{ENV['yelp_key']}"
    end
    render json: resp.body
  end

  private
  
  def search_params
    params.require(:search).permit(:term, :location)
  end
end