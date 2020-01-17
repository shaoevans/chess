json.forum do 
    json.extract! @forum, :id, :category, :description
    json.post_count @forum.posts.length
    json.comment_count @forum.comments.length
    last_comment = @forum.last_comment
    json.last_comment do
        json.extract! last_comment, :id, :created_at, :post_id
        json.author do 
            json.extract! last_comment.author, :id, :username
        end
        # json.page_num l
    end
    json.total_pages @posts.total_pages

end

json.posts do 
    json.array! @posts do |post|
        json.extract! post, :id, :title, :views, :updated_at
        json.comment_count post.comments.length
        last_comment = post.comments.last
        last_comment_index = post.comments.length - 1
        last_author = last_comment.author
        json.last_comment do 
            json.extract! last_comment, :id, :created_at
        end 
        json.last_comment_index last_comment_index
        json.last_author do
            json.extract! last_author, :id, :username
        end
    end
end


 