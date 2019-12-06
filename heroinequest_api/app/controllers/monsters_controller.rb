class MonstersController < ApplicationController
    def index
        monsters = Monster.all 
        render json: monsters
    end

    def show
        @monster = Monster.find(params[:id])
        render json: @monster
    end

end
