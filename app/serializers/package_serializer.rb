class PackageSerializer < ActiveModel::Serializer
  attributes :id, :height, :width, :depth,:cost, :paid_status, :email, :full_name, :phone_contact
  # has_one :user
  has_one :shipment
end
