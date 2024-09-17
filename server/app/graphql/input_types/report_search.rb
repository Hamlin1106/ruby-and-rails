class InputTypes::ReportSearch < Types::BaseInputObject
  graphql_name "ReportSearch"

  argument :date_from, String, required: false
  argument :date_to, String, required: false
  argument :month_from, String, required: false
  argument :month_to, String, required: false
  argument :month, String, required: false
  argument :line_ids, [String], required: false
  argument :code_ids, [String], required: false
  argument :except_zero, Boolean, required: false
end
