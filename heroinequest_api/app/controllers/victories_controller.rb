class VictoriesController < ApplicationController

    def index
        victories = Victory.all
        render json: victories
    end

    def show
       @victory = Victory.find(params[:id])
       render json: @victory
    end

    def create
        @victory = Victory.create(victoriesparams)

        if @victory.valid?
            render json: @victory
        else
            render json: @victory.errors.full_messages
        end

    end
    
     def update
        @victory = Victory.find(params[:id])
        @victory.update(victoriesparams)
        render json: @victory
     end

     def destroy
         @victory = Victory.find(params[:id])
         @victory.destroy
     end

     
    private


    def victoriesparams
        params.permit(:username,:scoreboard,:hero_id, :monster_id,:counter )
    end


end
