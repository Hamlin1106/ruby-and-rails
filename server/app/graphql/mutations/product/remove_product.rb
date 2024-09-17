class Mutations::Product::RemoveProduct < Mutations::BaseMutation
  null false

  argument :id, ID, required: true

  field :product, ObjectTypes::Product, null: true
  field :error, String, null: true

  def resolve(id:)
    product = ::Product.find(id)
    if product.lines.count > 0
      return { error: "このデータは削除できません" }
    end

    product.destroy!

    { product: product }
  rescue ActiveRecord::InvalidForeignKey
    { error: "このデータは削除できません" }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
