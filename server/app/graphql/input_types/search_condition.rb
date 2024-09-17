class InputTypes::SearchCondition < Types::BaseInputObject
  graphql_name "SearchConditionAttributes"

  argument :report_type, String, required: false
  argument :name, String, required: false
  argument :date_from, String, required: false
  argument :date_to, String, required: false
  argument :month_from, String, required: false
  argument :month_to, String, required: false
  argument :month, String, required: false
  argument :line_ids, [String], required: false
  argument :code_ids, [String], required: false
  argument :is_standard, Boolean, required: false
  argument :standard, Int, required: false
  argument :is_avarage, Boolean, required: false
  argument :except_zero, Boolean, required: false
  argument :font_size, String, required: false
end
