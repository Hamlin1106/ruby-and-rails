module Resolvers::Report
  class ReportDailyLineCodes < Resolvers::BaseResolver
    argument :search, InputTypes::ReportSearch, required: false

    type [ObjectTypes::ReportDailyLineCode], null: true

    def resolve(search:)
      values = ::ReportDailyLineCode.search(search).group(:date).sum(:count)

      result = []
      # 日付でソート
      dates = values.keys.sort
      dates.each do |date|
        result << {
          date: date,
          count: values[date]
        }
      end

      result
    end
  end
end
