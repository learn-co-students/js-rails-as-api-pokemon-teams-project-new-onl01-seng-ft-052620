class PokemonsController < ApplicationController
  def index
    pokemon = Pokemon.all
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    if pokemon
      render json: PokemonSerializer.new(pokemon).to_serialized_json
    else
      render json: {message: "no pokemon found"}
    end
  end

  def update
    pokemon = Pokemon.find_by(id: params[:id])
    if pokemon_params[:trainer_id] == "nil"
      pokemon.update(trainer_id: nil)
    else
      pokemon.update(pokemon_params)
    end
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

  private
  def pokemon_params
    params.require(:pokemon).permit(:trainer_id)
  end
end
