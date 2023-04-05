class Tracking < ApplicationRecord
  belongs_to :shipment

  validates :package_status, presence: true
  validates :location, presence: true
  validates :comment, presence: true
  validates :expected_arrival, presence: true

end
