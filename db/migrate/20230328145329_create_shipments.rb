class CreateShipments < ActiveRecord::Migration[6.1]
  def change
    create_table :shipments do |t|
      t.string :origin
      t.string :destination
      t.string :departure
      t.string :arrival
      t.string :rate_per_cbm
      t.boolean :has_shipped, null: false, default: false
      t.boolean :has_landed, null: false, default: false
      t.text :container_size

      t.timestamps
    end
  end
end
