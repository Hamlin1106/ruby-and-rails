p '--- seed:line,code'

ActiveRecord::Base.transaction do
  CSV.foreach('db/seeds/codes.csv').with_index do |csv, i|
    next if i == 0

    product_name = csv[0]&.strip
    factory_name = csv[1]&.strip
    line_name = csv[2]&.strip
    code_name = csv[3]&.strip

    factory = Factory.find_by!(name: factory_name)
    unless factory
      p "factory not found: #{factory_name}"
      next
    end

    product = Product.find_by!(name: product_name)
    unless product 
      p "product not found: #{product_name}"
      next
    end

    line = factory.lines.find_or_create_by!(name: line_name, product: product)
    line.codes.find_or_create_by!(name: code_name)
  end
end
