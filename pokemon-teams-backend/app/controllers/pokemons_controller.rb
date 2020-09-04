class PokemonsController < ApplicationController
    def show
        pokemon = Pokemon.find_by_id(params[:id])
        render json: pokemon, include: [:trainer]
    end

    def random 
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        Pokemon.create(nickname: name, species: species)
    end

    def destroy
        pokemon = Pokemon.find_by_id(params[:id])
        trainer = pokemon.trainer
        pokemon.destroy
        render json: trainer, include: [:pokemons]
    end
end
