class ObjectTypes::SearchCondition < Types::BaseObject
  graphql_name "SearchCondition"

  field :id, ID, null: false
  field :name, String, null: false
  field :report_type, String, null: false
  field :report_type_i18n, String, null: false
  field :line_ids, [String], null: true
  field :code_ids, [String], null: true
  field :date_from, String, null: true
  field :date_to, String, null: true
  field :month_from, String, null: true
  field :month_to, String, null: true
  field :month, String, null: true
  field :is_standard, Boolean, null: true
  field :is_avarage, Boolean, null: true
  field :standard, Int, null: true
  field :except_zero, Boolean, null: true
  field :position, Int, null: false
  field :font_size, String, null: true
end
