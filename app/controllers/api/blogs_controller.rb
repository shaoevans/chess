class Api::BlogsController < ApplicationController
    def index
        if (params[:year])
            @blogs = Blog.by_year(params[:year]).reverse_order.page(params[:page])
        else 
            @blogs = Blog.all.reverse_order.page(params[:page])
        end
        if params[:page] != 1 
            sleep 0.5
        end
        @latest_blog = @blogs.first
        render :index
    end

    def show
        @blog = Blog.find_by(id: params[:id])
        render :show
    end
end
