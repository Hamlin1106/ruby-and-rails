class ObjectTypes::LineUser < Types::BaseObject
  graphql_name "LineUser"

  field :id, ID, null: false
  field :line_id, ID, null: false
  field :line, ObjectTypes::Line, null: false
  field :user_id, ID, null: false
  field :user, ObjectTypes::User, null: false
end
