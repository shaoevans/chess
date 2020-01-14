class Api::PostsController < ApplicationController
    before_action :underscore_params!

    def underscore_params!
    underscore_hash = -> (hash) do
        hash.transform_keys!(&:underscore)
        hash.each do |key, value|
        if value.is_a?(ActionController::Parameters)
            underscore_hash.call(value)
        elsif value.is_a?(Array)
            value.each do |item|
            next unless item.is_a?(ActionController::Parameters)
            underscore_hash.call(item)
            end
        end
        end
    end
    underscore_hash.call(params)
    end

    def create
        @post = Post.new(post_params)
        @comment = Comment.new(comment_params)
        if @post.valid? && @comment.is_valid?
            @post.save
            @comment.post_id = @post.id
            @comment.save
            @comments = @post.comments.page(1)
            render :show
        else
            if !@post.valid? && !@comment.valid?
                render json: ["Title minmum length is 3", "Body minmum length is 3"], status: 402
            elsif !@post.valid?
                render json: ["Title Minimum length is 3"], status: 402
            else
                render json: ["Body minimum length is 3"], status: 402
            end
        end
    end

 

    def show
        @post = Post.find_by(id: params[:id])
        @post.increment!
        @comments = @post.comments.page(params[:page])
        render :show
    end

    def delete

    end

    private
    def post_params
        params.require(:post).permit(:author_id, :forum_id, :title)
    end

    def comment_params
        params.require(:post).permit(:author_id, :body)
    end
end
