class Api::UsersController < ApplicationController

    def create
        @user = User.new(user_params)
        if @user.save 
            login!(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 404
        end
    end

    def show
        @user = User.find_by(username: params[:id])
        render :show
    end

    def index
        @users = User.all.page(params[:page])
        render :index
    end
    def update

    end
    private
    def user_params
        params.require(:user).permit(:username, :password, :email)
    end
end
