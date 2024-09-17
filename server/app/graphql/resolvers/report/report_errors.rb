module Resolvers::Report
  class ReportErrors < Resolvers::BaseResolver
    argument :search, InputTypes::ReportSearch, required: false

    type [ObjectTypes::ReportError], null: true

    def resolve(search:)
      line_ids = []
      if search[:line_ids].present?
        line_ids = search[:line_ids]
      else
        line_ids = ::Line.all.ids
      end

      values = ::ReportError.search(search).group(:line).sum(:count)
      sorted_values = values.sort_by { |_, count| -count }

      results = []

      sorted_values.each do |v| 

        # ゼロ除外
        if search[:except_zero] == true
          next if v[1] == 0
        end

        results << {
          line: v[0],
          line_name: v[0].name,
          count: v[1]
        }
      end
      
      results
    end
  end
end
