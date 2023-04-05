class CreateShipments < ActiveRecord::Migration[6.1]
  def change
    create_table :shipments do |t|
      t.string :origin
      t.string :destination
      t.string :departure
      t.string :arrival
      t.string :rate_per_cbm
      t.string :status
      t.integer :container_size_in_feet

      t.timestamps
    end
  end
end
