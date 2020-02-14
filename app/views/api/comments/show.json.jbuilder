json.extract! @comment, :id,:body, :updated_at
json.author do 
    json.extract! @comment.author, :username
end
json.post do 
    json.extract! @comment.post, :id, :title, :forum_id, :updated_at
end




