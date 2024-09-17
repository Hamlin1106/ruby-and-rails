class Mutations::Code::RemoveCode < Mutations::BaseMutation
  null false

  argument :id, ID, required: true

  field :code, ObjectTypes::Code, null: true
  field :error, String, null: true

  def resolve(id:)
    code = ::Code.find(id)
    code.destroy!

    { code: code }
  rescue ActiveRecord::InvalidForeignKey
    { error: "このデータは削除できません" }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
