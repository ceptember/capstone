class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :article_id, :comment_text, :likes, :created_at, :updated_at

  belongs_to :user, serializer: CommentUserSerializer
end
