require 'nokogiri'
require 'open-uri'
require 'pry'

class Scraper 

  url = "https://theconversation.com/us/technology/articles" # displays most recent 25 articles 
  html = URI.open(url)
  tech_page = Nokogiri::HTML(html)
  $url_list =  tech_page.css('.article--header').css('h2').css('a').map{ |node| "https://theconversation.com" + node.attribute('href').value }

  $articles = []  

  $url_list.each do |url| 

    doc = Nokogiri::HTML(URI.open(url))

    content_array =  []
    doc.css('.content-body').css("p").each do |node| #each <p> tag
      para = ""
      node.children.each do |child| #each child in the node. SOme have text some dont
        if child.text 
          para = para + child.text #add the text content to the paragraph, only if it has text 
        end
      end 
      content_array << para #add paragraph to array of paragraphs 
    end

    article_info = { headline: doc.css('.instapaper_title').css('strong').text.strip, 
      authors: doc.css('.author-name').map{ |node| (node.children[0].text).strip}, 
      source_url: url,
      date:doc.css('.content-header-container').css(".timestamps").css("time")[0].children[0].text, 
      content: content_array
    }   
    $articles.unshift(article_info) # oldest first
  end

  def art 
    $articles 
  end

    #binding.pry

end 

