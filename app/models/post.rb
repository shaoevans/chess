class Post < ApplicationRecord
    validates :title, :views, presence: true

    belongs_to :forum

    has_many :comments
    
    belongs_to :author,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :User

    def increment!
        self.views += 1
        self.save
    end
end

