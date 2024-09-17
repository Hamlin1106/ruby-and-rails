module Resolvers::Code
  class Codes < Resolvers::BaseResolver
    argument :search, InputTypes::MasterSearch, required: false

    type [ObjectTypes::Code], null: true

    def resolve(search:)
      ::Code.includes(line: :factory).search(search).order(:line_id, :id)
    end
  end
end
