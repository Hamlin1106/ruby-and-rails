module Resolvers::User
  class User < Resolvers::BaseResolver
    argument :id, ID, required: true

    type ObjectTypes::User, null: true

    def resolve(id:)
      ::User.find(id)
    end
  end
end
