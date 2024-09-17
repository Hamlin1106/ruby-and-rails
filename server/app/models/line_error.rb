# == Schema Information
#
# Table name: line_errors
#
#  id             :bigint           not null, primary key
#  name(異常名称) :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  line_id        :bigint           not null
#
# Indexes
#
#  index_line_errors_on_line_id  (line_id)
#
# Foreign Keys
#
#  fk_rails_...  (line_id => lines.id)
#
class LineError < ApplicationRecord
  belongs_to :line
  has_many :report_errors, dependent: :destroy

  class << self
    def search(params)
      line_errors = all
      line_errors = line_errors.where(line_id: params[:line_ids]) if params[:line_ids].present?
      line_errors = line_errors.joins(:line).where(line: {factory_id: params[:factory_id]}) if params[:factory_id].present?
      line_errors = line_errors.joins(:line).where(line: {product_id: params[:product_id]}) if params[:product_id].present?
      line_errors = line_errors.where("line_errors.name iLike ?", "%#{params[:keyword]}%") if params[:keyword].present?
      line_errors
    end
  end
end
