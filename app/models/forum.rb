class Forum < ApplicationRecord
    validates :category, presence: true

    has_many :posts

    has_many :comments,
        through: :posts,
        source: :comments

    
    def last_comment
        self.comments.order("updated_at DESC").first
    end
end
