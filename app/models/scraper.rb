require 'nokogiri'
require 'open-uri'
require 'pry'

class AllArticleScraper 
  
  url = "https://theconversation.com/us/technology/articles"
  html = URI.open(url)
  tech_page = Nokogiri::HTML(html)
  $url_list =  tech_page.css('.article--header').css('h2').css('a').map{ |node| "https://theconversation.com" + node.attribute('href').value }

 # binding.pry
end 

class Scraper 

    # test_url = "https://theconversation.com/people-overestimate-groups-they-find-threatening-when-sizing-up-others-bias-sneaks-in-184357"
    # test_url2 = "https://theconversation.com/nasal-covid-19-vaccines-help-the-body-prepare-for-infection-right-where-it-starts-in-your-nose-and-throat-183790"
    # urls = [test_url, test_url2]

    # test_html = URI.open(test_url)
    # $doc = Nokogiri::HTML(test_html)

    articles = []  
    $url_list.each do |url| 

      doc = Nokogiri::HTML(URI.open(url))

      article_info = { headline: doc.css('.instapaper_title').css('strong').text.strip, 
         authors: doc.css('.author-name').map{ |node| (node.children[0].text).strip}, 
         source_url: url,
         date:doc.css('.content-header-container').css(".timestamps").css("time")[0].children[0].text, 
        # content: doc.css('.content-body').css("p").map{ |node| node.children[0].text} 
       }
       
       articles << article_info
  
    end

    binding.pry
    
  #   $doc = Nokogiri::HTML(URI.open(test_url))

  #  article_info = { headline: $doc.css('.instapaper_title').css('strong').text.strip, 
  #       authors: $doc.css('.author-name').map{ |node| (node.children[0].text).strip}, 
  #       source_url: test_url,
  #       date:$doc.css('.content-header-container').css(".timestamps").css("time")[0].children[0].text, 
  #       content: $doc.css('.content-body').css("p").map{ |node| node.children[0].text} # This works! Array of strings. 
  #     }
  
  #   binding.pry

end 







#scrape = Scraper.new 
#puts scrape 

