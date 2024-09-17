module Resolvers::Factory
  class Factories < Resolvers::BaseResolver
    argument :search, InputTypes::MasterSearch, required: false

    type [ObjectTypes::Factory], null: true

    def resolve(search:)
      ::Factory.search(search).order(:id)
    end
  end
end
