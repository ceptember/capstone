Rails.application.routes.draw do
  resources :users

  post '/signup', to: 'users#create'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
