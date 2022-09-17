# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

#info = scrape.article_info
#Article.create_article(info)

# SEED THE ARTICLES 

puts "Seeding..."
scrape = Scraper.new 
puts "scrape created"
articles_array = scrape.art
puts "articles array created. Items:  " 
puts "adding to db..."
Article.create(articles_array)
puts "done"

# SEED THE WORD LIST FOR THE GAMES 

words = [{word: 'annoy', definition: 'to bother with unpleasant deeds'}, {word: 'ignore', definition: 'To deliberately not listen or pay attention to.'}, {word: 'prefer', definition: 'To be in the habit of choosing something rather than something else'},{word: 'attention', definition: 'Mental focus'}, {word: 'instead', definition: 'In the place of something'}, {word: 'problem', definition: 'A difficulty that has to be resolved or dealt with.'}, {word: 'investigate', definition: 'To examine, look into, or scrutinize in order to discover something hidden or secret'}, {word: 'protect', definition: 'To keep safe; to defend; to guard'},{word: 'comfortable', definition: 'Providing physical comfort and ease; agreeable.'}, {word: 'invite', definition: 'To ask for the presence or participation of someone or something.'},{word: 'proud', definition: 'Feeling honoured (by something); feeling happy or satisfied about an event or fact'}, {word: 'consequence', definition: 'A result of actions, especially if such a result is unwanted or unpleasant.'},{word: 'important', definition: 'Having relevant and crucial value.'},{word: 'question', definition: 'A sentence, phrase or word which asks for information, reply or response'},{word: 'curious', definition: 'Tending to ask questions, or to want to explore or investigate; inquisitive;'},{word: 'jealous', definition: 'Envious; feeling resentful or angered toward someone for a perceived advantage or success'},{word: 'remind', definition: 'To cause one to experience a memory'},{word: 'curve', definition: 'A gentle bend, such as in a road.'},{word: 'leader', definition: 'One having authority to direct'},{word: 'repeat', definition: 'To do or say again'},{word: 'decide', definition: 'to make a judgment, especially after deliberation'},{word: 'report', definition: 'To relate details of (an event or incident)'},{word: 'direction', definition: 'A theoretical line (physically or mentally) followed from a point of origin or towards a destination.'},{word: 'listen', definition: 'To pay attention to a sound or speech'},{word: 'rhyme', definition: 'Sameness of sound of part of some words.'},{word: 'discover', definition: 'To find or learn something for the first time.'},{word: 'lovely', definition: 'Beautiful; charming; very pleasing in form, looks, tone, or manner.'},{word: 'respect', definition: 'an attitude of consideration or high regard'},{word: 'measure', definition: 'To ascertain the quantity of'}]
  
words.each do |w|    
    GameWord.create(w)  
end 