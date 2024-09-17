class Mutations::Code::UpdateCode < Mutations::BaseMutation
  null false

  argument :id, ID, required: true
  argument :attributes, InputTypes::Code, required: true

  field :code, ObjectTypes::Code, null: true
  field :error, String, null: true

  def resolve(id:, attributes:)
    code = ::Code.find(id)
    code.update!(attributes.to_h)

    { code: code.reload }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
