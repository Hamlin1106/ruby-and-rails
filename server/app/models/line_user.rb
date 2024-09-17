# == Schema Information
#
# Table name: line_users
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  line_id    :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_line_users_on_line_id  (line_id)
#  index_line_users_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (line_id => lines.id)
#  fk_rails_...  (user_id => users.id)
#
class LineUser < ApplicationRecord
  belongs_to :line
  belongs_to :user

  class << self
    def search(params)
      line_users = all
      line_users = line_users.where(line_id: params[:line_ids]) if params[:line_ids].present?
      line_users = line_users.joins(:line).where(line: {factory_id: params[:factory_id]}) if params[:factory_id].present?

      if params[:keyword].present?
        line_users = line_users.joins(:line, :user).where("lines.name iLike :keyword OR users.last_name iLike :keyword OR users.first_name iLike :keyword", keyword: "%#{params[:keyword]}%")
      end

      line_users
    end
  end
end
