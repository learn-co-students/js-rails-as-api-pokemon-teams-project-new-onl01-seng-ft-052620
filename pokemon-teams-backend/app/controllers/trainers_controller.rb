class TrainersController < ApplicationController
    def index
        trainers = Trainer.all

        render json: TrainerSerializer.new(trainers).to_serializable_hash
    end
end
