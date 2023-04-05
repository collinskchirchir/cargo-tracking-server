# variables for generating random data
package_status_adjectives = [
  "Delayed", 
  "In Transit",
  "Shipped",
  "Landed"
]

locations = [
  "China",
  "Kenya",
  "Egypt",
  "India", 
  "Japan",
  "United Kingdom",
  "Peru"
]

comment_adjectives = [
  "Hash weather conditions",
  "Custom duty traffic",
  "Workers Strike",
  "Capsized ship",
  "Pirates invasion"
]
comment_package_adjectives = [
  "Fragile",
  "Bio-Hazardous",
  "Perishable"
]


puts "🐕 Seeding data..."
# Users
10.times do
  user = User.create(
    email: Faker::Internet.email,
    password: "password",
    is_admin: [true, false].sample,
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    address: Faker::Address.full_address, 
    country: locations.sample
  )
end

mwaniki =  User.create(
  email: "mwaniki@gmail.com",
  password: "password",
  is_admin: true,
  first_name: "Dennis",
  last_name: "Mwaniki",
  address: "P.O. Box 10-10100, Nairobi",
  country: "Kenya"
)

# Shipment
10.times do
  shipment = Shipment.create(
    origin: locations.sample,
    destination: locations.sample,
    departure: Faker::Date.in_date_period(month: 4),
    arrival: Faker::Date.in_date_period(month: 4),
    rate_per_cbm: Faker::Number.within(range: 10..1000),
    status: ["Consolidating", "In Transit", "Landed"].sample,
    container_size_in_feet: [10,20,40].sample
  )
  rand(2..5).times do
    Tracking.create(
      shipment_id: shipment.id,
      package_status: package_status_adjectives.sample,
      location: locations.sample,
      comment: comment_adjectives.sample,
      expected_arrival: Faker::Date.in_date_period(month: 4)
    )
  end
  rand(2..5).times do
    Package.create(
      user_id: rand(1..10),
      shipment_id: shipment.id,
      height: Faker::Number.between(from: 2, to: 5),
      width: Faker::Number.between(from: 6, to: 10),
      depth: Faker::Number.between(from: 1, to: 3),
      cost: Faker::Number.within(range: 1000..10000),
      paid_status: [false, true].sample,
      comment: comment_package_adjectives.sample,
      email: Faker::Internet.email,
      full_name: Faker::Name.name,
      phone_contact: Faker::PhoneNumber.cell_phone,
      is_received: false
    )
  end
  

end



puts "✅ Done seeding!"

