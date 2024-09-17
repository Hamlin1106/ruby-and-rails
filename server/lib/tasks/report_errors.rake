require "csv"

namespace :report_errors do
  desc "頻発停止回数"
  task import: :environment do
    logger = Logger.new('log/report_errors.log')
    logger.info "start ..."

    ActiveRecord::Base.transaction do
      CSV.foreach('lib/tasks/report_errors.csv').with_index do |csv, i|
        next if i == 0
        line_name = csv[0]&.strip
        error_name = csv[1]&.strip
        date_value = csv[2]&.strip
        count = csv[3]&.strip || 0

        line = Line.find_by(name: line_name)
        unless line
          p "line not found: #{line_name}"
          next
        end

        line_error = line.line_errors.find_by(name: error_name)
        unless line_error
          p "line_error not found: #{error_name}"
          next
        end

        unless date_value
          p "date not found: #{date_value}"
          next
        end

        report_error = line.report_errors.find_by(line_error: line_error, date: Date.parse(date_value))
        unless report_error
          report_error = line.report_errors.create!(line_error: line_error, date: Date.parse(date_value))
        end
        report_error.update!(count: count)
      end
    end
  end
end
