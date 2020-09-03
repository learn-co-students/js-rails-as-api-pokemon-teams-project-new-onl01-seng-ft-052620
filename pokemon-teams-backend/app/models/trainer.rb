require 'faker'

class Trainer < ApplicationRecord
    has_many :pokemons


    def create_new_pokemon
        new_pokemon = self.pokemons.build()
        new_pokemon.nickname = Faker::Name.first_name
        new_pokemon.species = Faker::Games::Pokemon.name
        new_pokemon.save

        new_pokemon
    end

    def pokemon_count
        self.pokemons.count
    end
end
