json.extract! @comment, :id, :post_id, :body, :updated_at
json.author do 
    json.extract @comment.author, :username
end

