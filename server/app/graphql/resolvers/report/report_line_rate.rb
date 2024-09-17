module Resolvers::Report
  class ReportLineRate < Resolvers::BaseResolver
    argument :search, InputTypes::ReportSearch, required: false

    type [ObjectTypes::ReportLineRate], null: true

    def resolve(search:)
      date_from = search[:date_from] ? Date.parse(search[:date_from]) : Date.today.beginning_of_month
      date_to = search[:date_to] ? Date.parse(search[:date_to]) : Date.today.end_of_month + 3

      line_ids = []
      if search[:line_ids].present?
        lines = ::Line.where(id: search[:line_ids])
      else
        lines = ::Line.all
      end

      params = search

      results = []
      # ライン生産数
      count_values = ::ReportDailyLineCode.search(params).monthly_line_report
      # ライン計画数
      target_plans = ::ReportLinePlan.search(params).monthly_line_report
      # タクト
      target_takts = ::ReportLineTakt.search(params).monthly_line_report
      # 総加工時間
      time_values = ::ReportLineTime.search(params).monthly_line_report

      current_date = date_from.beginning_of_month

      dates = []
      while current_date <= date_to
        dates << current_date
        # 現在の月の開始日
        month_start = current_date.beginning_of_month


        lines.each do |line|
          h = {}
          h["month"] = current_date
          h["line_id"] = line.id
          h["line_name"] = line.name

          # ライン生産数
          count = count_values[[line.id, current_date.to_s]] || 0
          # 計画数
          plan_value = target_plans[[line.id, current_date.to_s]] || 0
          # タクト
          takt_value = target_takts[[line.id, current_date.to_s]] || 0
          # 総加工時間
          time_value = time_values[[line.id, current_date.to_s]] || 0

          rate = 0
          if plan_value == 0 || takt_value == 0 || time_value == 0
            rate = 0
          else
            rate =  (count / (plan_value / takt_value * time_value))
          end

          h["rate"] = rate
          
          results << h
        end

        # 次の月に進む
        current_date = current_date.next_month
      end

      # ゼロ除外
      if search[:except_zero] == true
        lines.each do |line|
          line_results = results.filter { |result| result["line_id"] == line.id }
          if line_results.all? { |item| item["rate"] == 0 }
            results.delete_if { |result| result["line_id"] == line.id }
          end
        end
      end


      results
    end
  end
end
