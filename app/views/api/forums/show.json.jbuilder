json.forum do 
    json.extract! @forum, :id, :category, :description, :post_ids
end

json.posts do 
    json.array! @posts do |post|
        json.extract! post, :title, :author_id, :comment_ids
    end
end


 