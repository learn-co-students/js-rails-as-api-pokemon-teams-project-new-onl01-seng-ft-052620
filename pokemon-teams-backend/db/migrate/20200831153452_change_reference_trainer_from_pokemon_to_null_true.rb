class ChangeReferenceTrainerFromPokemonToNullTrue < ActiveRecord::Migration[6.0]
  def change
    change_column_null :pokemons, :trainer_id, true
  end
end
