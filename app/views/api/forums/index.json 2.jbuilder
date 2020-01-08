@forums.each do |forum|
    json.set! forum.id do 
        json.extract! forum, :id, :category, :description, :post_ids
    end
end