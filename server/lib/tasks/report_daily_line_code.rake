require "csv"

namespace :report_daily_line_code do
  desc "ライン生産数"
  task import: :environment do
    logger = Logger.new('log/report_daily_line_code.log')
    logger.info "start ..."

    ActiveRecord::Base.transaction do
      CSV.foreach('lib/tasks/report_daily_line_code.csv').with_index do |csv, i|
        next if i == 0
        line_name = csv[0]&.strip
        code_name = csv[1]&.strip
        date_value = csv[2]&.strip
        count = csv[3]&.strip || 0

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

        report_daily_line_code = code.report_daily_line_codes.find_by(date: Date.parse(date_value))
        unless report_daily_line_code
          report_daily_line_code = code.report_daily_line_codes.create!(line: line, date: Date.parse(date_value))
        end
        report_daily_line_code.update!(count: count)
      end
    end
  end
end
