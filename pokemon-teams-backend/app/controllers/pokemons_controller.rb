class PokemonsController < ApplicationController

    def create
        trainer = Trainer.find(params[:trainer_id])

        if trainer && trainer.pokemon_count < 6
            new_pokemon = trainer.create_new_pokemon

            render json: PokemonSerializer.new(new_pokemon).to_serializable_hash
        end

    end

    def destroy
        deleted_pokemon = Pokemon.destroy(params[:id])

        render json: PokemonSerializer.new(deleted_pokemon).to_serializable_hash
    end

end
