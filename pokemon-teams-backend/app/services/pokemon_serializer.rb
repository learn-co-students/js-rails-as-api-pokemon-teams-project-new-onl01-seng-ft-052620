class PokemonSerializer
  def initialize(object)
    @pokemon = object
  end

  def to_serialized_json
    @pokemon.to_json(
      only: [:id, :species, :nickname, :trainer_id],
      include: {
        trainer: {only: [:name, :id]}
      }
    ) 
  end
end