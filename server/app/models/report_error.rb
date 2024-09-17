# == Schema Information
#
# Table name: report_errors
#
#  id              :bigint           not null, primary key
#  count(停止回数) :integer
#  date(日付)      :date             not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  line_error_id   :bigint           not null
#  line_id         :bigint           not null
#
# Indexes
#
#  index_report_errors_on_line_error_id  (line_error_id)
#  index_report_errors_on_line_id        (line_id)
#
# Foreign Keys
#
#  fk_rails_...  (line_error_id => line_errors.id)
#  fk_rails_...  (line_id => lines.id)
#
class ReportError < ApplicationRecord
  belongs_to :line
  belongs_to :line_error

  class << self
    def search(params)
      reports = self

      if params[:date_from].present? && params[:date_to].present?
        date_from = Date.parse(params[:date_from])
        date_to = Date.parse(params[:date_to])
        reports = reports.where(date: date_from.beginning_of_day..date_to.end_of_day)
      end

      if params[:line_ids].present?
        reports = reports.joins(:line).where(line: {id: params[:line_ids]})
      end

      reports
    end
  end
end
