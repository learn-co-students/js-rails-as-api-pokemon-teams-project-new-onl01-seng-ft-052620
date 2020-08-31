class TrainerSerializer
  def initialize(object)
    @trainer = object
  end

  def to_serialized_json
    @trainer.to_json(
      include: {pokemons: 
        {only: [:species, :nickname, :id]}
      },
      only: [:name, :id]
    )
  end
end

