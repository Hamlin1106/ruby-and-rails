module Resolvers::Line
  class Lines < Resolvers::BaseResolver
    argument :search, InputTypes::MasterSearch, required: false

    type [ObjectTypes::Line], null: true

    def resolve(search:)
      ::Line.joins(:factory).search(search).order(:id)
    end
  end
end
