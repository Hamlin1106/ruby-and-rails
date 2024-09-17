class ObjectTypes::ReportAvailabilityRate < Types::BaseObject
  graphql_name "ReportAvailabilityRate"

  field :line_id, ID, null: false
  field :line_name, String, null: false
  field :line, ObjectTypes::Line, null: true
  field :date, String, null: true
  field :rate, Float, null: true
  field :prev_date, String, null: true
  field :prev_rate, Float, null: true
end
