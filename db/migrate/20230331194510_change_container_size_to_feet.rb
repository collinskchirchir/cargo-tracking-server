class ChangeContainerSizeToFeet < ActiveRecord::Migration[6.1]
  def change
    change_column :shipments, :container_size, :integer
  end
end
