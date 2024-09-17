p '--- seed:user'

ActiveRecord::Base.transaction do

  password = 'password'
  users = [
    { email: 'admin1@gmail.com', last_name: '管理者1', first_name: 'ユーザー', role: :admin }, 
    { email: 'admin2@gmail.com', last_name: '管理者2', first_name: 'ユーザー', role: :admin }, 
  ]

  users.each do |user_attribute|
    user = User.find_by(last_name: user_attribute[:last_name], first_name: user_attribute[:first_name])
    unless user
      user = User.create!(
        email: user_attribute[:email], last_name: user_attribute[:last_name], first_name: user_attribute[:first_name], password: password
      )
    end
  end
end
