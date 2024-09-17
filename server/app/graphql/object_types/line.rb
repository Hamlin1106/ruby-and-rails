class ObjectTypes::Line < Types::BaseObject
  graphql_name "Line"

  field :id, ID, null: false
  field :factory_id, ID, null: false
  field :factory, ObjectTypes::Factory, null: false
  field :product_id, ID, null: false
  field :product, ObjectTypes::Product, null: false
  field :name, String, null: false
  field :takt, Float, null: true
  field :code_count, Int, null: true
  field :user_count, Int, null: true
end
