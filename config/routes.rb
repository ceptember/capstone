Rails.application.routes.draw do
  resources :comments
  resources :articles
  resources :users

  post '/signup', to: 'users#create'
  post "/login", to: "sessions#create" 
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  
end
