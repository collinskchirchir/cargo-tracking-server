class ShipmentSerializer < ActiveModel::Serializer
  attributes :id, :origin, :destination, :departure, :arrival, :rate_per_cbm, :container_size_in_feet, :status
  has_many :trackings
  has_many :packages 
end
