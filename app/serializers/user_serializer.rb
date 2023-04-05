class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password, :is_admin, :first_name, :last_name, :address, :country
end
