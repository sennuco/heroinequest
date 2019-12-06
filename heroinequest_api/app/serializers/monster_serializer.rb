class MonsterSerializer < ActiveModel::Serializer
  attributes :id, :name, :atk, :def, :hp, :mp, :spell
end
