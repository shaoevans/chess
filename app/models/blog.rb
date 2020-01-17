class Blog < ApplicationRecord
    validates :body, :author_id, :category, :title, :description, presence: true;
    validates :category, inclusion: ["Chess", "Announcements"]
    before_validation :ensure_image_id

    def ensure_image_id
        self.image_id ||= (1..18).to_a.sample
    end
    

    scope :by_year, lambda { |year| where('extract(year from created_at) = ?', year) }

    belongs_to :author,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :User
end
