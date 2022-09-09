class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :article

    validates :comment_text, presence: true

end
