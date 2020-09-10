class PokemonsController < ApplicationController

    def create
        pokemon = Pokemon.generate(params[:trainer_id])
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find_by_id(params[:id])
        pokemon.destroy
        render json: pokemon
    end
end
