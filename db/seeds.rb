# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

#info = scrape.article_info
#Article.create_article(info)

puts "Seeding..."
scrape = Scraper.new 
puts "scrape created"
articles_array = scrape.art
puts "articles array created. Items:  " 
puts "adding to db..."
Article.create(articles_array)
puts "done"

