class TrainerSerializer

  def initialize(trainer_object)
    @trainer = trainer_object
  end

  def to_serializable_hash
    @trainer.to_json(
      only: [
        :id,
        :name
      ],
      include: [
        :pokemons => {
          only: [
            :id,
            :nickname,
            :species,
            :trainer_id
          ]
        }
      ]
    )
  end

end
