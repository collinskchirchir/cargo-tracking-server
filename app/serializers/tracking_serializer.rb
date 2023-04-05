class TrackingSerializer < ActiveModel::Serializer
  attributes :id, :package_status, :location, :comment, :expected_arrival
  has_one :shipment
end
