class Hero < ApplicationRecord
    has_many :victories
    has_many :monsters , through: :victories
end
