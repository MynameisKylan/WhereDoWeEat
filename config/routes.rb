Rails.application.routes.draw do
  root 'pages#welcome'

  devise_for :users, controllers: { sessions: 'sessions', registrations: 'registrations' }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :v1, defaults: { format: :json } do
    resource :login, only: [:create], controller: :sessions
  end

  get '*path', to: 'pages#welcome', via: :all
end
