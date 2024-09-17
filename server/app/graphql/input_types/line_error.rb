class InputTypes::LineError < Types::BaseInputObject
  graphql_name "LineErrorAttributes"

  argument :line_id, ID, required: false
  argument :name, String, required: false
end
