json.post do 
    json.extract! @post, :id, :title, :comment_ids
end

json.comments do 
    json.array! @comments do |comment|
        json.extract! comment, :post_id, :author_id, :body
    end
end

