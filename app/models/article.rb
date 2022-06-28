class Article < ApplicationRecord

    has_many :comments
    has_many :users, through: :comments 

    def self.create_article(article_info)
        Article.create(article_info)
    end 

end
