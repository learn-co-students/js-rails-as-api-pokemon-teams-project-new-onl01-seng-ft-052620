class TrainersController < ApplicationController
    def index 
        trainers = Trainer.all
        #render json: trainers, include: [:pokemons]
        # TrainerSerializer.new(trainers).to_serialized_json
        render json: trainers.to_json(:include=> {
            :pokemons => {:only => [:id, :nickname, :species, :trainer_id]}},
            :except => [:created_at, :updated_at])
    end 
end
