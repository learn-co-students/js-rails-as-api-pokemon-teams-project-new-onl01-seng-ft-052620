Rails.application.routes.draw do
  resources :trainers, only: [:index, :show] 
  resources :pokemons, only: [:index, :show, :update]
end
