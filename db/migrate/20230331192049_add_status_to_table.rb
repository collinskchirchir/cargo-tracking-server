class AddStatusToTable < ActiveRecord::Migration[6.1]
  def change
    remove_column :shipments, :has_shipped, :boolean
    remove_column :shipments, :has_landed, :boolean
    add_column :shipments, :status, :text
  end
end