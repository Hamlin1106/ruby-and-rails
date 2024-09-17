class Mutations::SearchCondition::RemoveSearchCondition < Mutations::BaseMutation
  null false

  argument :id, ID, required: true

  field :search_condition, ObjectTypes::SearchCondition, null: true
  field :error, String, null: true

  def resolve(id:)
    search_condition = ::SearchCondition.find(id)
    search_condition.destroy!

    { search_condition: search_condition }
  rescue ActiveRecord::InvalidForeignKey
    { error: "このデータは削除できません" }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
