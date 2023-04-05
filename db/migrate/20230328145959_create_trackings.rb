class CreateTrackings < ActiveRecord::Migration[6.1]
  def change
    create_table :trackings do |t|
      t.string :package_status
      t.string :location
      t.string :comment
      t.date :expected_arrival
      t.belongs_to :shipment, null: false, foreign_key: true

      t.timestamps
    end
  end
end
