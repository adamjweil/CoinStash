# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
User.delete_all

# coinbaseAccount = User.create(first_name: "CoinStash Test 1", last_name: "Final Project", email: "email@email.com", password: "password", password_confirmation: "password")

# Second Test Account
# coinbaseAccount2 = User.create(first_name: "CoinStash Test 2", last_name: "Final Project", email: "coin@coin.com", password: "password", password_confirmation: "password")



# 5.times do
#   User.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.safe_email, password: "password", password_confirmation: "password")
# end
