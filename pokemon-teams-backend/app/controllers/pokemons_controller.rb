class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        
        render json: PokemonSerializer.new(pokemons).to_serialized_json
    end

    def show
        pokemon = Pokemon.find_by_id(params[:id])
        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end

    def create
        trainer = Trainer.find_by(params[:trainer_id])

        pokemon = trainer.pokemons.build({
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name
        })

        pokemon.save

        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end

    def destroy
        pokemon = Pokemon.find_by_id(params[:id])
        pokemon.destroy

        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end
end
