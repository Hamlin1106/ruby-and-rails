module Resolvers::SearchCondition
  class SearchConditions < Resolvers::BaseResolver
    argument :search, InputTypes::SearchConditionSearch, required: false

    type [ObjectTypes::SearchCondition], null: true

    def resolve(search:)
      ::SearchCondition.search(search).order(:id)
    end
  end
end
