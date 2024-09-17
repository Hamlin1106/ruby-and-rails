class Mutations::SearchCondition::UpdateSearchCondition < Mutations::BaseMutation
  null false

  argument :id, ID, required: true
  argument :attributes, InputTypes::SearchCondition, required: true

  field :search_condition, ObjectTypes::SearchCondition, null: true
  field :error, String, null: true

  def resolve(id:, attributes:)
    search_condition = ::SearchCondition.find(id)
    search_condition.update!(attributes.to_h)

    { search_condition: search_condition.reload }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
