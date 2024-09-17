class ObjectTypes::ReportLineRate < Types::BaseObject
  graphql_name "ReportLineRate"

  field :line_id, ID, null: false
  field :line_name, String, null: false
  field :month, String, null: true
  field :rate, Int, null: true
end
