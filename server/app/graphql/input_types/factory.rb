class InputTypes::Factory < Types::BaseInputObject
  graphql_name "FactoryAttributes"

  argument :name, String, required: false
end
