class Mutations::Factory::CreateFactory < Mutations::BaseMutation
  null false

  argument :attributes, InputTypes::Factory, required: true

  field :factory, ObjectTypes::Factory, null: true
  field :error, String, null: true

  def resolve(attributes:)
    factory = ::Factory.create!(attributes.to_h)

    { factory: factory }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
