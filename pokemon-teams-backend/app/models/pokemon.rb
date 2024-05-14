class Pokemon < ApplicationRecord
  belongs_to :trainer, required: false 
end
