p '--- seed:factory'

ActiveRecord::Base.transaction do
  names = ['本社第1', '本社第2']
  names.each do |name|
    Factory.find_or_create_by(name: name)
  end
end
