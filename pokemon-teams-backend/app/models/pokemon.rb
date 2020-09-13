class Pokemon < ApplicationRecord
  belongs_to :trainer
  
  validate do
    pokemon_count_valid?
  end

  private
  # for pokemon #, make sure there are 6
  def pokemon_count_valid?
    if self.trainer.pokemons.count >= 6
      self.errors.add(:team_max, "Hey, don't get crazy! The max number of pokemons is 6!")
    end
  end
end
