class CreatePackages < ActiveRecord::Migration[6.1]
  def change
    create_table :packages do |t|
      t.decimal :height
      t.decimal :width
      t.decimal :depth
      t.decimal :cost
      t.boolean :paid_status, null: false, default: false
      t.string :comment
      t.string :email
      t.string :full_name
      t.string :phone_contact
      t.boolean :is_received, null: false, default: false
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :shipment, null: false, foreign_key: true

      t.timestamps
    end
  end
end
