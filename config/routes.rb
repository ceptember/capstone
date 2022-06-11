Rails.application.routes.draw do
  resources :articles
  resources :users

  post '/signup', to: 'users#create'
  post "/login", to: "sessions#create" 
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
