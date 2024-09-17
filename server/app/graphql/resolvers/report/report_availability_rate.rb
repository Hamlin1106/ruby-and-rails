module Resolvers::Report
  class ReportAvailabilityRate < Resolvers::BaseResolver
    argument :search, InputTypes::ReportSearch, required: false

    type [ObjectTypes::ReportAvailabilityRate], null: true

    def resolve(search:)
      month = Date.parse("#{search[:month]}-01")
      prev_month = month.prev_month

      date_from = month.beginning_of_month
      date_to = month.end_of_month

      prev_date_from = prev_month.beginning_of_month
      prev_date_to = prev_month.end_of_month


      line_ids = []
      if search[:line_ids].present?
        line_ids = search[:line_ids]
      else
        line_ids = ::Line.all.ids
      end

      params = search.to_h.merge(date_from: date_from.to_s, date_to: date_to.to_s)
      prev_params = search.to_h.merge(date_from: prev_date_from.to_s, date_to: prev_date_to.to_s)

      results = []
      line_ids.each do |line_id|
        line = ::Line.find(line_id)

        # ライン生産数
        count = ::ReportDailyLineCode.search(params).where(line_id: line_id).sum(:count)
        prev_count = ::ReportDailyLineCode.search(prev_params).where(line_id: line_id).sum(:count)

        # 計画数
        target_plans = ::ReportLinePlan.search(params).where(line_id: line_id)
        plan_value = target_plans.count != 0 ? (target_plans.sum(:plan) / target_plans.count) : 0

        prev_target_plans = ::ReportLinePlan.search(prev_params).where(line_id: line_id)
        prev_plan_value = prev_target_plans.count != 0 ? (prev_target_plans.sum(:plan) / prev_target_plans.count) : 0

        # ラインタクト(秒)
        takt_value = line.takt ? (line.takt * 60 * 60) : 0

        prev_target_takts = ::ReportLineTakt.search(prev_params).where(line_id: line_id)
        prev_takt_value = prev_target_takts.count != 0 ? (prev_target_takts.sum(:takt) / prev_target_takts.count) : 0

        # 総加工時間
        time_value = ::ReportLineTime.search(params).where(line_id: line_id).sum(:time)
        prev_time_value = ::ReportLineTime.search(prev_params).where(line_id: line_id).sum(:time)

        rate = 0
        if plan_value == 0 || takt_value == 0 || time_value == 0
          rate = 0
        else
          rate =  (count / (plan_value / takt_value * time_value))
        end

        prev_rate = 0
        if prev_plan_value == 0 || prev_takt_value == 0 || prev_time_value == 0
          prev_rate = 0
        else
          prev_rate =  (prev_count / (prev_plan_value / prev_takt_value * prev_time_value))
        end

        # ゼロ除外
        if search[:except_zero] == true
          next if rate == 0
        end

        results << {
          line_id: line_id,
          line_name: line.name,
          rate: rate.round(1),
          prev_rate: prev_rate.round(1),
          date: month,
        }
      end

      results
    end
  end
end
