class Mutations::Factory::RemoveFactory < Mutations::BaseMutation
  null false

  argument :id, ID, required: true

  field :factory, ObjectTypes::Factory, null: true
  field :error, String, null: true

  def resolve(id:)
    factory = ::Factory.find(id)
    if factory.lines.count > 0 || factory.products.count > 0
      return { error: "このデータは削除できません" }
    end

    factory.destroy!

    { factory: factory }
  rescue ActiveRecord::InvalidForeignKey
    { error: "このデータは削除できません" }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
