class Api::ForumsController < ApplicationController
    def index
        @forums = Forum.all.includes(:comments)
        render :index
    end

    def show
        @forum = Forum.find_by(id: params[:id])
        @posts = @forum.posts.order("updated_at DESC").page(params[:page]).includes(:comments).includes(:author)
        render :show
    end

end
