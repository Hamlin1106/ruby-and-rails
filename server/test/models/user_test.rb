# == Schema Information
#
# Table name: users
#
#  id                   :bigint           not null, primary key
#  confirmation_token   :string
#  confirmed_at         :datetime
#  email(email)         :string
#  first_name(名)       :string           not null
#  last_name(姓)        :string           not null
#  password(パスワード) :string           not null
#  role(権限)           :integer          default("general"), not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#
require "test_helper"

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
