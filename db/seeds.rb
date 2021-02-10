# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create([{ email: 'fake1@mail.com', password: 'password' },
             { email: 'fake2@mail.com', password: 'password' },
             { email: 'fake3@mail.com', password: 'password' }])

Friendship.create([{ user_id: 1, friend_id: 2 },
                   { user_id: 2, friend_id: 3 }])

Restaurant.create([{ yelp_id: 'chick fil a' },
                   { yelp_id: 'popeyes' },
                   { yelp_id: 'boss bird' }])

Rating.create([{ user_id: 1, restaurant_id: 1, value: 4 },
               { user_id: 2, restaurant_id: 2, value: 3 },
               { user_id: 3, restaurant_id: 3, value: 5 }])
