Rails.application.routes.draw do
  
  resources :trackings, only: [:create, :update, :destroy, :show, :index]
  resources :packages, only: [:create, :update, :destroy, :show, :index]
  resources :shipments, only: [:create, :update, :destroy, :show, :index]
  resources :users, only: [:create, :update, :destroy, :show, :index]
  post '/signup', to: 'users#create'
  post "/login", to: "sessions#create"

  # user auto-login
  get "/me", to: "users#show"

  # user logout
  delete "/logout", to: "sessions#destroy"

  # Custom route for fetching tracking info on Homepage
  post '/search', to: 'searches#create'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
