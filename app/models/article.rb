class Article < ApplicationRecord

    def self.create_article(article_info)
        Article.create(article_info)
    end 

end
