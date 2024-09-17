class InputTypes::Code < Types::BaseInputObject
  graphql_name "CodeAttributes"

  argument :line_id, ID, required: false
  argument :name, String, required: false
end
