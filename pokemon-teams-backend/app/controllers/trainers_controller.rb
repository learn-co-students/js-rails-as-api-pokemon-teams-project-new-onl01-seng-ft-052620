class TrainersController < ApplicationController

    def index 
        trainers = Trainer.all
        renderJson
    end

    def show 
        set_trainer
        renderJson
    end

    def addPokemon
        set_trainer
        if trainer.pokemons.length < 6 
            trainer.pokemons << randomPoke
        end
        renderJson
    end


    private 

    def renderJson 
        render json: trainers, include: [:pokemons]
    end

    def set_trainer
        trainer = Trainer.find_by_id(params[:id])
    end

    def randomPoke()
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name 
        Pokemon.create(nickname: name, species: species)
    end
end

