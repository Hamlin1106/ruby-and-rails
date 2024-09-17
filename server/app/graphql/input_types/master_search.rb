class InputTypes::MasterSearch < Types::BaseInputObject
  graphql_name "MasterSearch"

  argument :product_id, ID, required: false
  argument :factory_id, ID, required: false
  argument :line_ids, [ID], required: false
  argument :keyword, String, required: false
end
