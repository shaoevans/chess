json.comments do
    json.array! @comments do |comment|
        json.extract! comment, :id, :post_id, :body, :updated_at
        json.post do 
            json.extract! comment.post, :id, :title, :forum_id, :updated_at
        end
        json.author do
            json.extract! comment.author, :username
        end
    end
end

json.page @page

