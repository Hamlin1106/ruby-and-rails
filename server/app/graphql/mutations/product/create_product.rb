class Mutations::Product::CreateProduct < Mutations::BaseMutation
  null false

  argument :attributes, InputTypes::Product, required: true

  field :products, [ObjectTypes::Product], null: true
  field :error, String, null: true

  def resolve(attributes:)
    ::Product.create!(attributes.to_h)
    products = ::Product.all.order(:id)

    { products: products }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
