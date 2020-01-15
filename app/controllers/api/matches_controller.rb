class Api::MatchesController < ApplicationController

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
        @match = Match.new(match_params)
        if @match.save
            render :show
        else
            render @match.errors.full_messages
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


    private
    def match_params
        params.require(:match).permit(:white_player_id, :black_player_id, :match_type)
    end
end
