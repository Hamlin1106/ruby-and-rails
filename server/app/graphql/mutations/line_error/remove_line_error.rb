class Mutations::LineError::RemoveLineError < Mutations::BaseMutation
  null false

  argument :id, ID, required: true

  field :line_error, ObjectTypes::LineError, null: true
  field :error, String, null: true

  def resolve(id:)
    line_error = ::LineError.find(id)
    line_error.destroy!

    { line_error: line_error }
  rescue ActiveRecord::InvalidForeignKey
    { error: "このデータは削除できません" }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
