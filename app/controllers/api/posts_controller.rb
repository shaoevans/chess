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
            @comments = @post.comments
            render :show
        else
            render @post.errors.full_messages + @comment.errors.full_messages, status: 402
        end
    end

    def show
        @post = Post.find_by(id: params[:id])
        @comments = @post.comments
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
