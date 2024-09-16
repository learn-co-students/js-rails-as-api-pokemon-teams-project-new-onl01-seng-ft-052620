class TrainersController < ApplicationController
  before_action :set_trainer, only: [:show, :update, :destroy]

  # GET /trainers
  def index
    @trainers = Trainer.all

    render json: @trainers, include: [:pokemon]
  end

  # GET /trainers/1
  def show
    render json: @trainer
  end


  # PATCH/PUT /trainers/1
  def update
    if @trainer.update(trainer_params)
      render json: @trainer
    else
      render json: @trainer.errors, status: :unprocessable_entity
    end
  end

  # DELETE /trainers/1
  def destroy
    @trainer.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_trainer
      @trainer = Trainer.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def trainer_params
      params.require(:trainer).permit(:name)
    end
end
