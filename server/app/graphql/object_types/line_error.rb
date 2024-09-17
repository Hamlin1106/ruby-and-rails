class ObjectTypes::LineError < Types::BaseObject
  graphql_name "LineError"

  field :id, ID, null: false
  field :line_id, ID, null: false
  field :name, String, null: false
  field :line, ObjectTypes::Line, null: false
end
