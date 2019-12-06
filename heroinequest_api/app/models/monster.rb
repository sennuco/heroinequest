class Monster < ApplicationRecord
    has_many :victories
    has_many :heroes , through: :victories
end
