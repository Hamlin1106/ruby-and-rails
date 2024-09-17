class Mutations::Line::UpdateLine < Mutations::BaseMutation
  null false

  argument :id, ID, required: true
  argument :attributes, InputTypes::Line, required: true

  field :line, ObjectTypes::Line, null: true
  field :error, String, null: true

  def resolve(id:, attributes:)
    line = ::Line.find(id)
    line.update!(attributes.to_h)

    { line: line.reload }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
