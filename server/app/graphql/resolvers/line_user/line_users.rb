module Resolvers::LineUser
  class LineUsers < Resolvers::BaseResolver
    argument :search, InputTypes::MasterSearch, required: false

    type [ObjectTypes::LineUser], null: true

    def resolve(search:)
      ::LineUser.joins(:line).search(search).order(:id)
    end
  end
end
