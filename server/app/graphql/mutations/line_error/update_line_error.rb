class Mutations::LineError::UpdateLineError < Mutations::BaseMutation
  null false

  argument :id, ID, required: true
  argument :attributes, InputTypes::LineError, required: true

  field :line_error, ObjectTypes::LineError, null: true
  field :error, String, null: true

  def resolve(id:, attributes:)
    line_error = ::LineError.find(id)
    line_error.update!(attributes.to_h)

    { line_error: line_error.reload }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
