Rails.application.routes.draw do
  resources :pokemons
  resources :trainers
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post 'trainers/:id' => 'trainers#addPokemon'
  get 'randomPoke' => 'pokemons#randomPokemon'
  
end
