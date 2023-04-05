class Package < ApplicationRecord
  belongs_to :user
  belongs_to :shipment

  validates :width, presence: true, numericality: { greater_than: 0 }
  validates :height, presence: true, numericality: { greater_than: 0 }
  validates :depth, presence: true, numericality: { greater_than: 0 }
  validates :cost, presence: true, numericality: { greater_than: 0 }
  validates :email, presence: true
  validates :full_name, presence: true
  validates :phone_contact, presence: true

end
