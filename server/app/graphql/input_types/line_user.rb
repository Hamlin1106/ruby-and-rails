class InputTypes::LineUser < Types::BaseInputObject
  graphql_name "LineUserAttributes"

  argument :line_id, ID, required: false
  argument :user_id, ID, required: false
end
