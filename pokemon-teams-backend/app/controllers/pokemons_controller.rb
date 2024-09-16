class PokemonsController < ApplicationController
  def create
   
    trainer = Trainer.find_by_id(params[:id])
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)

    render json: pokemon
  end

  def destroy
    pokemon = Pokemon.find_by_id(params[:id])
    pokemon.destroy
    render json: pokemon
  end
end
