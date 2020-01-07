class Api::ForumsController < ApplicationController
    def index
        @forums = Forum.all
        render :index
    end

    def show
        @forum = Forum.find_by(id: params[:id])
        @posts = @forum.posts
        render :show
    end

end
