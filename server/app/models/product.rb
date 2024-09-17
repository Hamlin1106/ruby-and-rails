# == Schema Information
#
# Table name: products
#
#  id             :bigint           not null, primary key
#  name(製品名称) :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  factory_id     :bigint           not null
#
# Indexes
#
#  index_products_on_factory_id  (factory_id)
#
# Foreign Keys
#
#  fk_rails_...  (factory_id => factories.id)
#
class Product < ApplicationRecord
  belongs_to :factory
  has_many :lines

  class << self
    def search(params)
      products = all
      products = products.where("products.name iLike ?", "%#{params[:keyword]}%") if params[:keyword].present?
      products
    end
  end
end
