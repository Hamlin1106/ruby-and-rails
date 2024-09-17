class Mutations::SearchCondition::CreateSearchCondition < Mutations::BaseMutation
  null false

  argument :attributes, InputTypes::SearchCondition, required: true

  field :search_conditions, [ObjectTypes::SearchCondition], null: true
  field :error, String, null: true

  def resolve(attributes:)
    ::SearchCondition.create!(attributes.to_h)
    search_conditions = ::SearchCondition.all.order(:id)

    { search_conditions: search_conditions }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
