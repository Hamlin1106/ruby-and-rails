# == Schema Information
#
# Table name: lines
#
#  id                 :bigint           not null, primary key
#  name(ライン名称)   :string           not null
#  takt(ラインタクト) :float
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  factory_id         :bigint           not null
#  product_id         :bigint           not null
#
# Indexes
#
#  index_lines_on_factory_id  (factory_id)
#  index_lines_on_product_id  (product_id)
#
# Foreign Keys
#
#  fk_rails_...  (factory_id => factories.id)
#  fk_rails_...  (product_id => products.id)
#
class Line < ApplicationRecord
  belongs_to :factory
  belongs_to :product
  has_many :codes, dependent: :destroy
  has_many :line_errors, dependent: :destroy
  has_many :report_errors, dependent: :destroy
  has_many :line_users, dependent: :destroy

  class << self
    def search(params)
      lines = all
      lines = lines.where(id: params[:line_ids]) if params[:line_ids].present?
      lines = lines.where(factory_id: params[:factory_id]) if params[:factory_id].present?
      lines = lines.where(product_id: params[:product_id]) if params[:product_id].present?
      lines = lines.where("lines.name iLike ?", "%#{params[:keyword]}%") if params[:keyword].present?
      lines
    end
  end

  def code_count
    codes.count
  end

  def user_count
    line_users.count
  end
end
