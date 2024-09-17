module Resolvers::Product
  class Products < Resolvers::BaseResolver
    argument :search, InputTypes::MasterSearch, required: false

    type [ObjectTypes::Product], null: true

    def resolve(search:)
      ::Product.search(search).order(:id)
    end
  end
end
