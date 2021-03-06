class User < ApplicationRecord
    validates :username, :session_token, presence: true
    validates :password, length: {minimum: 6, allow_nil: true}
    validates :username, :email, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP } 
    before_validation :ensure_session_token
    attr_reader :password

    def self.find_by_credentials(username, password) 
        user = User.find_by(username: username)
        user = User.find_by(email: username) unless user
        return nil unless user
        user.is_password?(password) ? user : nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64
    end

    has_many :posts,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :Post,
        dependent: :destroy

    has_many :comments,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :Comment,
        dependent: :destroy

    has_many :blogs,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :Blog,
        dependent: :destroy

    def matches
        Match.where("black_player_id = ? OR white_player_id = ?", self.id, self.id)
    end

    def current_matches
        self.matches.where("pending = ?", true)
    end

    def previous_matches
        self.matches.where("pending = ?", false)
    end


end

