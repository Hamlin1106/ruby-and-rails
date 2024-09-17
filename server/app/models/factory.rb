# == Schema Information
#
# Table name: factories
#
#  id             :bigint           not null, primary key
#  name(工場名称) :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class Factory < ApplicationRecord
  has_many :products, dependent: :destroy
  has_many :lines, dependent: :destroy

  class << self
    def search(params)
      factories = all
      factories = factories.where("name iLike ?", "%#{params[:keyword]}%") if params[:keyword].present?
      factories
    end
  end
end
