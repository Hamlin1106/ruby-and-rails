class InputTypes::Product < Types::BaseInputObject
  graphql_name "ProductAttributes"

  argument :factory_id, ID, required: false
  argument :name, String, required: false
end
