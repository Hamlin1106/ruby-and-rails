class Mutations::Factory::UpdateFactory < Mutations::BaseMutation
  null false

  argument :id, ID, required: true
  argument :attributes, InputTypes::Factory, required: true

  field :factory, ObjectTypes::Factory, null: true
  field :error, String, null: true

  def resolve(id:, attributes:)
    factory = ::Factory.find(id)
    factory.update!(attributes.to_h)

    { factory: factory.reload }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
