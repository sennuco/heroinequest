class VictorySerializer < ActiveModel::Serializer
  attributes :id, :username, :scoreboard, :hero_id, :monster_id, :counter
end
