class Mutations::Line::RemoveLine < Mutations::BaseMutation
  null false

  argument :id, ID, required: true

  field :line, ObjectTypes::Line, null: true
  field :error, String, null: true

  def resolve(id:)
    line = ::Line.find(id)
    line.destroy!

    { line: line }
  rescue ActiveRecord::InvalidForeignKey
    { error: "このデータは削除できません" }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
