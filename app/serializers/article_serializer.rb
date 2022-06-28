class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :headline, :authors, :source_url, :date, :content

  has_many :comments
end
