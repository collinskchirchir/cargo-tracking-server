class User < ApplicationRecord
  # has_secure_password
  has_many :packages
  has_many :shipments, through: :packages

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :address, presence: true
  validates :country, presence: true

end
