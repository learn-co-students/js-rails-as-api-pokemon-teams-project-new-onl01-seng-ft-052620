class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: trainers, include: [:pokemons]
    end

    def show
        trainer = Trainer.find_by_id(params[:id])
        render json: trainer, include: [:pokemons]
    end

    def addPokemon
        trainer = Trainer.find_by_id(params[:id])
        if trainer.pokemons.length < 6
            trainer.pokemons << randomPokemon
        end
        render json: trainer, include: [:pokemons]
    end

    private

    def randomPokemon()
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    Pokemon.create(nickname: name, species: species)
    
    end

end
