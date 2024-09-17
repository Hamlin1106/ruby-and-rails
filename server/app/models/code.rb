# == Schema Information
#
# Table name: codes
#
#  id             :bigint           not null, primary key
#  name(品番名称) :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  line_id        :bigint           not null
#
# Indexes
#
#  index_codes_on_line_id  (line_id)
#
# Foreign Keys
#
#  fk_rails_...  (line_id => lines.id)
#
class Code < ApplicationRecord
  belongs_to :line
  has_many :report_daily_line_codes, dependent: :destroy
  has_many :report_line_plans, dependent: :destroy
  has_many :report_line_takts, dependent: :destroy
  has_many :report_line_times, dependent: :destroy

  class << self
    def search(params)
      codes = all
      codes = codes.where(line_id: params[:line_ids]) if params[:line_ids].present?
      codes = codes.joins(:line).where(line: {factory_id: params[:factory_id]}) if params[:factory_id].present?
      codes = codes.joins(:line).where(line: {product_id: params[:product_id]}) if params[:product_id].present?
      codes = codes.where("codes.name iLike ?", "%#{params[:keyword]}%") if params[:keyword].present?
      codes
    end
  end
end
