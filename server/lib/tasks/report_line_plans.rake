require "csv"

namespace :report_line_plans do
  desc "ライン生産数"
  task import: :environment do
    logger = Logger.new('log/report_line_plans.log')
    logger.info "start ..."

    ActiveRecord::Base.transaction do
      CSV.foreach('lib/tasks/report_line_plans.csv').with_index do |csv, i|
        next if i == 0
        line_name = csv[0]&.strip
        code_name = csv[1]&.strip
        date_value = csv[2]&.strip
        plan = csv[3]&.strip || 0

        line = Line.find_by(name: line_name)
        unless line
          p "line not found: #{line_name}"
          next
        end

        code = line.codes.find_by(name: code_name)
        unless code
          p "code not found: #{code_name}"
          next
        end

        unless date_value
          p "date not found: #{date_value}"
          next
        end

        report_line_plan = code.report_line_plans.find_by(date: Date.parse(date_value))
        unless report_line_plan
          report_line_plan = code.report_line_plans.create!(line: line, date: Date.parse(date_value))
        end
        report_line_plan.update!(plan: plan)
      end
    end
  end
end
