# == Schema Information
#
# Table name: search_conditions
#
#  id                        :bigint           not null, primary key
#  code_ids(品番)            :string           is an Array
#  date_from(日付from)       :date
#  date_to(日付to)           :date
#  except_zero(ゼロ除外)     :boolean
#  is_avarage(平均値使用)    :boolean
#  is_standard(基準値使用)   :boolean
#  line_ids(ラインID)        :string           is an Array
#  month(月)                 :string
#  month_from(月from)        :string
#  month_to(月to)            :string
#  name(名称)                :string           not null
#  position(position)        :integer          not null
#  report_type(レポート種別) :integer          not null
#  standard(基準値)          :integer
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#
class SearchCondition < ApplicationRecord
  acts_as_list top_of_list: 0

  enum report_type: { report_rate_last_month: 0, report_error: 1, report_line_rate: 2, report3: 3, report_work_rate: 4 }, _prefix: true

  class << self
    def search(params)
      conditions = self
      conditions = conditions.where(report_type: params[:report_type]) if params[:report_type].present?
      conditions
    end
  end
end
