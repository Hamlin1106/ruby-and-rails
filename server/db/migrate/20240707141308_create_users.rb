class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :last_name, null: false, comment: '姓'
      t.string :first_name, null: false, comment: '名'
      t.string :email, index: { unique: true }, comment: 'email'
      t.string :password, null: false, comment: 'パスワード'
      t.string :confirmation_token
      t.datetime :confirmed_at
      t.integer :role, null: false, default: 0, comment: '権限'

      t.timestamps
    end

    create_table :factories do |t|
      t.string :name, null: false, comment: '工場名称'

      t.timestamps
    end

    create_table :products do |t|
      t.references :factory, null: false, foreign_key: true
      t.string :name, null: false, comment: '製品名称'

      t.timestamps
    end

    create_table :lines do |t|
      t.references :factory, null: false, foreign_key: true
      t.references :product, null: false, foreign_key: true
      t.string :name, null: false, comment: 'ライン名称'
      t.float :takt, comment: 'ラインタクト'

      t.timestamps
    end

    create_table :line_users do |t|
      t.references :line, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    create_table :codes do |t|
      t.references :line, null: false, foreign_key: true
      t.string :name, null: false, comment: '品番名称'

      t.timestamps
    end

    create_table :line_errors do |t|
      t.references :line, null: false, foreign_key: true
      t.string :name, null: false, comment: '異常名称'

      t.timestamps
    end

    create_table :report_daily_line_codes do |t|
      t.references :line, null: false, foreign_key: true
      t.references :code, null: false, foreign_key: true
      t.date :date, null: false, comment: '日付'
      t.integer :count, comment: '生産数'

      t.timestamps
    end

    create_table :report_line_plans do |t|
      t.references :line, null: false, foreign_key: true
      t.references :code, null: false, foreign_key: true
      t.date :date, null: false, comment: '日付'
      t.integer :plan, comment: '計画数'

      t.timestamps
    end

    create_table :report_line_takts do |t|
      t.references :line, null: false, foreign_key: true
      t.references :code, null: false, foreign_key: true
      t.date :date, null: false, comment: '日付'
      t.float :takt, comment: 'タクト'

      t.timestamps
    end

    create_table :report_line_times do |t|
      t.references :line, null: false, foreign_key: true
      t.references :code, null: false, foreign_key: true
      t.date :date, null: false, comment: '日付'
      t.integer :time, comment: '加工時間'

      t.timestamps
    end

    create_table :report_errors do |t|
      t.references :line, null: false, foreign_key: true
      t.references :line_error, null: false, foreign_key: true
      t.date :date, null: false, comment: '日付'
      t.integer :count, comment: '停止回数'

      t.timestamps
    end

    create_table :search_conditions do |t|
      t.string :name, null: false, comment: '名称'
      t.integer :report_type, null: false, comment: 'レポート種別'
      t.date :date_from, comment: '日付from'
      t.date :date_to, comment: '日付to'
      t.string :month_from, comment: '月from'
      t.string :month_to, comment: '月to'
      t.string :month, comment: '月'
      t.string :line_ids, array: true, comment: 'ラインID'
      t.string :code_ids, array: true, comment: '品番'
      t.boolean :is_standard, comment: '基準値使用'
      t.integer :standard, comment: '基準値'
      t.boolean :is_avarage, comment: '平均値使用'
      t.boolean :except_zero, comment: 'ゼロ除外'
      t.string :font_size, comment: 'フォントサイズ'
      t.integer :position, null: false, comment: 'position'

      t.timestamps
    end
  end
end
