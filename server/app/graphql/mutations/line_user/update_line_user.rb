class Mutations::LineUser::UpdateLineUser < Mutations::BaseMutation
  null false

  argument :id, ID, required: true
  argument :attributes, InputTypes::LineUser, required: true

  field :line_user, ObjectTypes::LineUser, null: true
  field :error, String, null: true

  def resolve(id:, attributes:)
    line_user = LineUser.find_by(line_id: attributes[:line_id], user_id: attributes[:user_id])
    if line_user
      return { error: "すでに該当ユーザーが登録されています" }
    end

    line_user = ::LineUser.find(id)
    line_user.update!(attributes.to_h)

    { line_user: line_user.reload }
  rescue => e
    Rails.logger.error(e)
    return GraphQL::ExecutionError.new(e.message)
  end
end
