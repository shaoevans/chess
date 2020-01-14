
json.blogs do
    json.array! @blogs do |blog|
        json.extract! blog, :id, :created_at, :title, :description, :image_id, :category
    end
end


json.latest_blog do
    json.extract! @latest_blog, :id, :created_at, :title, :description, :body, :image_id, :category
    json.author do
        json.extract! @latest_blog.author, :id, :username
    end
end


