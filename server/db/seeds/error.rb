p '--- seed:error'

ActiveRecord::Base.transaction do
  CSV.foreach('db/seeds/errors.csv').with_index do |csv, i|
    next if i == 0

    product = csv[0]&.strip
    factory_name = csv[1]&.strip
    line_name = csv[2]&.strip
    error_name = csv[3]&.strip

    factory = Factory.find_by!(name: factory_name)
    unless factory
      p "factory not found: #{factory_name}"
      next
    end

    line = factory.lines.find_by(name: line_name)
    unless line
      p "line not found: #{line_name}"
      next
    end

    line.line_errors.find_or_create_by!(name: error_name)
  end
end
