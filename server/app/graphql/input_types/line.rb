class InputTypes::Line < Types::BaseInputObject
  graphql_name "LineAttributes"

  argument :factory_id, ID, required: false
  argument :product_id, ID, required: false
  argument :name, String, required: false
  argument :takt, Float, required: false
end
