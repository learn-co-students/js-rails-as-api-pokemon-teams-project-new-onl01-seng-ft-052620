class TrainerSerializer 

    def initialize(trainer_object)
        @trainer_object = trainer_object
    end

    def to_serialized_json 
        @trainer_object.to_json(:include=> {
            :pokemons => {:only => [:id, :nickname, :species, :trainer_id]}},
            :except => [:created_at, :updated_at])
    end 
    
end