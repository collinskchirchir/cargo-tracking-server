class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password
      t.boolean :is_admin, null: false, default: false
      t.string :first_name
      t.string :last_name
      t.string :address
      t.string :country

      t.timestamps
    end
  end
end
