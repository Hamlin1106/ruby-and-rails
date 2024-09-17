class Mutations::LineError::CreateLineError < Mutations::BaseMutation
  null false

  argument :attributes, InputTypes::LineError, required: true

  field :line_errors, [ObjectTypes::LineError], null: true
  field :error, String, null: true

  def resolve(attributes:)
    ::LineError.create!(attributes.to_h)
    line_errors = ::LineError.all.order(:id)

    { line_errors: line_errors }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
