Rails.application.routes.draw do
  resources :movies
  resources :genres
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end


# Prefix Verb   URI Pattern           Controller#Action
# movies GET    /movies(.:format)     movies#index
#        POST   /movies(.:format)     movies#create
#  movie GET    /movies/:id(.:format) movies#show
#        PATCH  /movies/:id(.:format) movies#update
#        PUT    /movies/:id(.:format) movies#update
#        DELETE /movies/:id(.:format) movies#destroy
# genres GET    /genres(.:format)     genres#index
#        POST   /genres(.:format)     genres#create
#  genre GET    /genres/:id(.:format) genres#show
#        PATCH  /genres/:id(.:format) genres#update
#        PUT    /genres/:id(.:format) genres#update
#        DELETE /genres/:id(.:format) genres#destroy