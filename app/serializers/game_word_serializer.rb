class GameWordSerializer < ActiveModel::Serializer
  attributes :id, :word, :definition
end
