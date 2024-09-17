class InputTypes::SearchConditionSearch < Types::BaseInputObject
  graphql_name "SearchConditionSearch"

  argument :report_type, String, required: false
  argument :keyword, String, required: false
end
