class PokemonsController < ApplicationController
    def show 
        set_pokemon
        render json: pokemon, include: [:trainer]
    end 

    def randomPokemon()
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name 
        Pokemon.create(nickname: name, species: species)
    end

    def destroy 
        set_pokemon
        trainer = pokemon.trainer 
        pokemon.destroy 
        render json: trainer, include: [:pokemons]
    end
    
    private

    def set_pokemon
        pokemon = Pokemon.find_by_id(params[:id])
    end
end
