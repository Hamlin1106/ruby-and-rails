class Mutations::LineUser::RemoveLineUser < Mutations::BaseMutation
  null false

  argument :id, ID, required: true

  field :line_user, ObjectTypes::LineUser, null: true
  field :error, String, null: true

  def resolve(id:)
    line_user = ::LineUser.find(id)
    line_user.destroy!

    { line_user: line_user }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
