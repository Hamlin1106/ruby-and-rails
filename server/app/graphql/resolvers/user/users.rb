module Resolvers::User
  class Users < Resolvers::BaseResolver
    type [ObjectTypes::User], null: true

    def resolve
      ::User.all.order(:id)
    end
  end
end
