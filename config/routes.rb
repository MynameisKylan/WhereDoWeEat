Rails.application.routes.draw do
  root 'pages#welcome'

  devise_for :users, defaults: { format: :json }, controllers: { sessions: 'sessions', registrations: 'registrations' }

  resource :ratings, only: [:create, :update]

  # Alternative namespace and sessions controller - Not currently used
  # namespace :v1, defaults: { format: :json } do
    # resource :login, only: [:create], controller: :sessions
  # end

  get '*path', to: 'pages#welcome', via: :all
end
