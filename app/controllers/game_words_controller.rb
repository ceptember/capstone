class GameWordsController < ApplicationController
    def index
        game_words = GameWord.all
        render json: game_words, status: :ok 
    end
end
