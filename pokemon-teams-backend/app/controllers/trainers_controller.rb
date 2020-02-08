class TrainersController < ApplicationController

    def index
        @trainers = Trainer.all
        render json: @trainers, status: 200, include: [:pokemons]
    end







    
end # controller end
