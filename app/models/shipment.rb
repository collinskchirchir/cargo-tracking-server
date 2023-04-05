class Shipment < ApplicationRecord
  has_many :packages, dependent: :destroy
  has_many :trackings, dependent: :destroy
  has_many :users, through: :packages

  validates :origin, presence: true
  validates :destination, presence: true
  validates :departure, presence: true
  validates :arrival, presence: true
  validates :rate_per_cbm, presence: true, numericality: { greater_than: 0 }
  validates :container_size_in_feet, presence: true, numericality: { greater_than: 0 }
  validates :status, inclusion: {in: ["Consolidating", "In Transit", "Landed"] }

end
