class ObjectTypes::Code < Types::BaseObject
  graphql_name "Code"

  field :id, ID, null: false
  field :line_id, ID, null: false
  field :name, String, null: false
  field :line, ObjectTypes::Line, null: false
end
