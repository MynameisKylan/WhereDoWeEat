class PagesController < ApplicationController
  skip_before_action :authorized

  def welcome
  end
end