class Mutations::Product::UpdateProduct < Mutations::BaseMutation
  null false

  argument :id, ID, required: true
  argument :attributes, InputTypes::Product, required: true

  field :product, ObjectTypes::Product, null: true
  field :error, String, null: true

  def resolve(id:, attributes:)
    product = ::Product.find(id)
    product.update!(attributes.to_h)

    { product: product.reload }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
