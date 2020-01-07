class Forum < ApplicationRecord
    validates :category, presence: true

    has_many :posts

end
