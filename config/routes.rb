Rails.application.routes.draw do
  root 'pages#welcome'

  devise_for :users, skip: [:registrations], defaults: { format: :json }, controllers: { sessions: 'sessions', registrations: 'registrations' }
  # skip devise registrations and only create the route to create new users - mainly to bypass devise authorization for delete requests
  as :user do
    post '/users', to: 'registrations#create', as: :user_registration
  end

  resource :ratings, only: [:create, :update]
  resource :restaurants, only: [:search] do
    post :search, on: :member
  end

  resource :party, only: [:search] do
    post :search, on: :member
  end

  resource :friendships, only: [:show, :create, :remove] do
    post :remove, on: :member
  end

  resource :users, only: [:show, :destroy]

  get '*path', to: 'pages#welcome', via: :all
end
