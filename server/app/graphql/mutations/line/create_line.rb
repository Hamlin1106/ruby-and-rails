class Mutations::Line::CreateLine < Mutations::BaseMutation
  null false

  argument :attributes, InputTypes::Line, required: true

  field :lines, [ObjectTypes::Line], null: true
  field :error, String, null: true

  def resolve(attributes:)
    ::Line.create!(attributes.to_h)
    lines = ::Line.all.order(:id)

    { lines: lines }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
