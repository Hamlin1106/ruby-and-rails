class Mutations::Code::CreateCode < Mutations::BaseMutation
  null false

  argument :attributes, InputTypes::Code, required: true

  field :codes, [ObjectTypes::Code], null: true
  field :error, String, null: true

  def resolve(attributes:)
    ::Code.create!(attributes.to_h)
    codes = ::Code.all.order(:id)

    { codes: codes }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
