class ObjectTypes::Factory < Types::BaseObject
  graphql_name "Factory"

  field :id, ID, null: false
  field :name, String, null: false
end
