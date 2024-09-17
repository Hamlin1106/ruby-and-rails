p '--- seed:product'

name = '本社第1'
factory = Factory.find_by(name: name)

products = ['ブシュ']

ActiveRecord::Base.transaction do
  products.each do |product_name|
    factory.products.find_or_create_by!(name: product_name)
  end
end
