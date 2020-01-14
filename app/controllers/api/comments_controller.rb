class Api::CommentsController < ApplicationController
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
        @comment = Comment.new(comment_params)
        if @comment.save
            @comment.post.touch(:updated_at)
            render :show
        else
            render json: @comment.errors.full_messages, status: 402
        end
    end

    def index
        @comments = Comment.order("updated_at DESC").page(params[:page])
        render :index
    end
    private

    def comment_params
        params.require(:comment).permit(:body, :author_id, :post_id)
    end
end
