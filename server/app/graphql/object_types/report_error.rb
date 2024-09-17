class ObjectTypes::ReportError < Types::BaseObject
  graphql_name "ReportError"

  field :line, ObjectTypes::Line, null: true
  field :line_name, String, null: true
  field :count, Int, null: false
end
