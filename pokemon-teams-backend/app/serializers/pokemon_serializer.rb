class PokemonSerializer

    def initialize(pokemon_object)
        @pokemon = pokemon_object
    end

    def to_serializable_hash
        @pokemon.to_json(
            only: [
                :id,
                :nickname,
                :species,
                :trainer_id
            ]
        )
    end

end
