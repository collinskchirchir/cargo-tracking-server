class ChangeContainertofeet < ActiveRecord::Migration[6.1]
  def change
    rename_column :shipments, :container_size, :container_size_in_feet
  end
end
