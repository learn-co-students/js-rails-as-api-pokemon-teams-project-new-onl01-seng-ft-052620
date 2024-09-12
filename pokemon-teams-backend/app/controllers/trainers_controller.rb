class TrainersController < ApplicationController

    def index 
        trainers = Trainer.all
        render json: trainers, include: [:pokemons]

    end

    def show 
        set_trainer
        render json: @trainer, include: [:pokemons]

    end

    def addPokemon
        set_trainer
        if @trainer.pokemons.length < 6 
            @trainer.pokemons << randomPoke
        end
        render json: @trainer, include: [:pokemons]

    end


    private 

    def set_trainer
        @trainer = Trainer.find_by_id(params[:id])
    end

    def randomPoke()
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name 
        Pokemon.create(nickname: name, species: species)
    end
end

