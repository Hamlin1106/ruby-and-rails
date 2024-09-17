class ObjectTypes::ReportDailyLineCode < Types::BaseObject
  graphql_name "ReportDailyLineCode"

  # field :id, ID, null: false
  # field :code_id, ID, null: false
  field :date, String, null: false
  field :count, Int, null: false
end
