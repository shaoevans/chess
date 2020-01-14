json.extract! @blog, :id, :created_at, :title, :description, :body, :image_id, :category
json.author do
    json.extract! @blog.author, :id, :username, :created_at
end
