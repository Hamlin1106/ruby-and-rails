class ObjectTypes::Product < Types::BaseObject
  graphql_name "Product"

  field :id, ID, null: false
  field :factory_id, ID, null: false
  field :factory, ObjectTypes::Factory, null: true
  field :name, String, null: false
end
