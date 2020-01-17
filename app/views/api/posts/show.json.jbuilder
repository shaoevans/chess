json.post do 
    json.extract! @post, :id, :title, :views, :updated_at
    json.comment_count @comments.length
    last_comment = @comments.last
    last_comment_index = @comments.length - 1
    last_author = last_comment.author
    json.last_comment do
        json.extract! last_comment, :id, :created_at
    end
    json.last_comment_index last_comment_index
    json.last_author do
        json.extract! last_author, :id, :username
    end
    json.total_pages @comments.total_pages
end

json.comments do 
    json.array! @comments do |comment|
        json.extract! comment, :id, :post_id, :body, :updated_at
        json.author do
            json.extract! comment.author, :username
        end
        json.post do
            json.extract! comment.post, :id, :title, :forum_id
        end
    end

end


