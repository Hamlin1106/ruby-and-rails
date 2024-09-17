# == Schema Information
#
# Table name: report_daily_line_codes
#
#  id            :bigint           not null, primary key
#  count(生産数) :integer
#  date(日付)    :date             not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  code_id       :bigint           not null
#  line_id       :bigint           not null
#
# Indexes
#
#  index_report_daily_line_codes_on_code_id  (code_id)
#  index_report_daily_line_codes_on_line_id  (line_id)
#
# Foreign Keys
#
#  fk_rails_...  (code_id => codes.id)
#  fk_rails_...  (line_id => lines.id)
#
class ReportDailyLineCode < ApplicationRecord
  belongs_to :line
  belongs_to :code

  # 月(YYYY-MM-DD),ラインIDごとに集計
  scope :monthly_line_report, -> {
    group(:line_id, "TO_CHAR(DATE_TRUNC('month', date), 'YYYY-MM-DD')").sum(:count)
  }

  class << self
    def search(params)
      reports = self

      if params[:date_from].present? && params[:date_to].present?
        date_from = Date.parse(params[:date_from])
        date_to = Date.parse(params[:date_to])
        reports = reports.where(date: date_from.beginning_of_day..date_to.end_of_day)
      end

      if params[:line_ids].present?
        reports = reports.joins(code: :line).where(line: {id: params[:line_ids]})
      end

      if params[:code_ids].present?
        reports = reports.joins(:code).where(code: {id: params[:code_ids]})
      end

      reports
    end
  end
end
