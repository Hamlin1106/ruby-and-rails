module Resolvers::LineError
  class LineErrors < Resolvers::BaseResolver
    argument :search, InputTypes::MasterSearch, required: false

    type [ObjectTypes::LineError], null: true

    def resolve(search:)
      ::LineError.includes(line: :factory).search(search).order(:line_id, :id)
    end
  end
end
