module Resolvers::Line
  class Line < Resolvers::BaseResolver
    argument :id, ID, required: false

    type ObjectTypes::Line, null: true

    def resolve(id:)
      ::Line.find(id)
    end
  end
end
