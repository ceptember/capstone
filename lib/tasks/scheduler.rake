desc "This task is called by the Heroku scheduler add-on"

task :publish_articles => :environment do

    puts "Searching..."
    update_scrape = UpdateScraper.new 
    articles_array = update_scrape.new_articles
    puts "adding to db..."
    Article.create(articles_array)
    puts "done"
end 

# Article has source_url 

# test as follows:
# heroku run rake publish_articles
# change frequency via dashboard on the web 