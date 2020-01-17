class Api::MatchesController < ApplicationController
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
        @player2 = User.find_by(username: params[:match]["player2_name"])
        if @player2 
            @match = Match.new(match_params)
            if match_params[:black_player_id].length > 0
                @match.white_player_id = @player2.id
            else
                @match.black_player_id = @player2.id
            end
            @match.save
            render :show
        else
            render json: ["User could not be found, please try again"], status: 402
        end

    end

    def index
        @user = User.find_by(id: params[:user_id])
        if params[:current]
            @matches = @user.current_matches
        elsif params[:previous]
            @matches = @user.previous_matches
        else
            @matches = @user.matches
        end
        render :index
    end

    def show
        @match = Match.find_by(id: params[:id])
        if @match
            render :show
        else
            render json: ["cannot find page"], status: 404
        end
    end


    private
    def match_params
        params.require(:match).permit(:white_player_id, :black_player_id, :match_type)
    end
end
