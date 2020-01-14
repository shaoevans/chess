@forums.each do |forum|
    json.set! forum.id do 
        json.extract! forum, :id, :category, :description
        json.post_count forum.posts.length
        json.comment_count forum.comments.length
        last_comment = forum.last_comment
        json.last_comment do
            json.extract! last_comment, :id, :created_at, :post_id
            json.author do 
                json.extract! last_comment.author, :username, :id
            end
        end
    end
end

